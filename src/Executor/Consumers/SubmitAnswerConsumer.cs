using System.Diagnostics;
using System.Text;
using MassTransit;
using Microsoft.Extensions.Options;
using OnlineJudge.Contracts.Messages;
using OnlineJudge.Executor.Isolate;

namespace OnlineJudge.Executor.Consumers;

public class SubmitAnswerConsumer(
    RotatingNumberProvider numberProvider,
    IOptions<IsolateOptions> isolateOptions)
    : IConsumer<SubmitAnswerMessage>
{
    private readonly IsolateOptions _isolateOptions = isolateOptions.Value;

    public async Task Consume(ConsumeContext<SubmitAnswerMessage> context)
    {
        // await Task.Delay(TimeSpan.FromSeconds(5));

        var boxId = numberProvider.GetNextNumber();

        var workingDirectory = await GetWorkingDirectory(boxId);

        await InitSourceFile(context, workingDirectory);

        await context.Publish(new SubmissionJudgedMessage(
            context.Message.SubmissionId,
            JudgeStatus.Compiling()));

        var (compileSuccess, compileError) = await CompileAsync(context, boxId);
        if (!compileSuccess)
        {
            await context.Publish(new SubmissionJudgedMessage(
                context.Message.SubmissionId,
                JudgeStatus.CompileError(compileError)));
            return;
        }

        await context.Publish(new SubmissionJudgedMessage(
            context.Message.SubmissionId,
            JudgeStatus.Evaluating()));

        foreach (var testcase in context.Message.TestCases)
        {
            var (runSuccess, actualOutput, runError) = await RunAsync(context,
                boxId,
                testcase);

            if (runSuccess) continue;

            if (!string.IsNullOrEmpty(runError))
                await context.Publish(new SubmissionJudgedMessage(
                    context.Message.SubmissionId,
                    JudgeStatus.RuntimeError(runError)));
            else
                await context.Publish(new SubmissionJudgedMessage(
                    context.Message.SubmissionId,
                    JudgeStatus.Rejected(testcase, actualOutput)));

            return;
        }

        await context.Publish(new SubmissionJudgedMessage(
            context.Message.SubmissionId,
            JudgeStatus.Accepted()));

        await CleanUpAsync(boxId);
    }

    private static async Task CleanUpAsync(int boxId)
    {
        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "isolate",
                Arguments = $"-b {boxId} --cleanup"
            }
        };
        process.Start();
        await process.WaitForExitAsync();
    }

    private async Task<(bool success, string ActualOutput, string Error)>
        RunAsync(
            ConsumeContext<SubmitAnswerMessage> context,
            int boxId,
            TestCase testCase)
    {
        var argumentsBuilder = new StringBuilder();

        argumentsBuilder.Append($" -b {boxId} -s --run")
            .Append($" -f {_isolateOptions.FileSizeLimitInKB}")
            .Append($" -k {_isolateOptions.StackLimitInKB}")
            .Append($" -m {context.Message.MemoryLimit}")
            .Append($" -t {context.Message.TimeLimit.TotalSeconds}")
            .Append($" --extra-time {_isolateOptions.ExtraTimeLimitInSec}")
            .Append($" -p{_isolateOptions.ProcessCountLimit}");


        foreach (var environmentVariable in
                 _isolateOptions.EnvironmentVariables)
            argumentsBuilder.Append($" -E {environmentVariable}");

        var arguments = argumentsBuilder
            .Append($" --run -- {context.Message.RunCmd}")
            .ToString();


        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "isolate",
                Arguments = arguments,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                RedirectStandardInput = true
            }
        };
        process.Start();

        await process.StandardInput.WriteAsync(testCase.Input);
        await process.StandardInput.DisposeAsync();

        await process.WaitForExitAsync();

        if (process.ExitCode != 0)
            return (false, string.Empty,
                await process.StandardError.ReadToEndAsync());

        var actualOutput = await process.StandardOutput.ReadToEndAsync();
        actualOutput = actualOutput.Trim();

        return (
            string.Equals(actualOutput,
                testCase.Output.Trim(),
                StringComparison.Ordinal), actualOutput, string.Empty);
    }

    private async Task<(bool success, string error)> CompileAsync(
        ConsumeContext<SubmitAnswerMessage> context,
        int boxId)
    {
        var argumentsBuilder = new StringBuilder();

        argumentsBuilder.Append($" -b {boxId} -s")
            .Append($" -f {_isolateOptions.FileSizeLimitInKB}")
            .Append($" -k {_isolateOptions.StackLimitInKB}")
            .Append($" -m {_isolateOptions.MemoryLimitInKB}")
            .Append($" -t {_isolateOptions.TimeLimitInSec}")
            .Append($" -w {_isolateOptions.WallTimeLimitInSec}")
            .Append($" --extra-time {_isolateOptions.ExtraTimeLimitInSec}")
            .Append($" -p{_isolateOptions.ProcessCountLimit}");

        foreach (var environmentVariable in
                 _isolateOptions.EnvironmentVariables)
            argumentsBuilder.Append($" -E {environmentVariable}");

        var arguments = argumentsBuilder
            .Append($" --run -- {context.Message.CompileCmd}")
            .ToString();

        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "isolate",
                Arguments = arguments,
                RedirectStandardError = true,
                RedirectStandardOutput = true
            }
        };
        process.Start();
        await process.WaitForExitAsync();

        return (process.ExitCode == 0,
            await process.StandardError.ReadToEndAsync());
    }

    private static async Task InitSourceFile(
        ConsumeContext<SubmitAnswerMessage> context,
        string workingDirectory)

    {
        var sourceCode = context.Message.SourceCode;

        var sourceFile =
            Path.Combine(workingDirectory, context.Message.SourceFile);
        await File.WriteAllTextAsync(sourceFile, sourceCode);
    }

    private static async Task<string> GetWorkingDirectory(int boxId)
    {
        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "isolate",
                Arguments = $"-b {boxId} --init",
                RedirectStandardOutput = true
            }
        };
        process.Start();
        await process.WaitForExitAsync();
        var workingDirectory = await process.StandardOutput.ReadToEndAsync();
        return Path.Join(workingDirectory.Trim(), "box");
    }
}