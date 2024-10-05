using HotChocolate.Execution.Configuration;
using OnlineJudge.API.Application.Problems;
using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Types.Submissions;

[ObjectType<Submission>]
public static partial class SubmissionNode
{
    static partial void Configure(IObjectTypeDescriptor<Submission> descriptor)
    {
        descriptor.BindFieldsExplicitly();

        descriptor.Field(s => s.Id);

        descriptor
            .Field(s => s.SourceCode);

        descriptor
            .Field(s => s.Submitter);

        descriptor
            .Field(s => s.Contest);

        descriptor
            .Field(s => s.Language);
    }

    public static ISubmissionStatus GetStatus([Parent] Submission submission)
    {
        return submission.Status.Kind switch
        {
            SubmissionStatusKind.Pending => new SubmissionPending(),
            SubmissionStatusKind.Compiling => new SubmissionCompiling(),
            SubmissionStatusKind.Evaluating => new SubmissionEvaluating(),
            SubmissionStatusKind.Accepted => new SubmissionAccepted(),
            SubmissionStatusKind.Rejected => new SubmissionRejected
            {
                TestCase = submission.Status.TestCase,
                ActualOutput = submission.Status.ActualOutput
            },
            SubmissionStatusKind.CompileError => new SubmissionCompileError
            {
                Error = submission.Status.Error
            },
            SubmissionStatusKind.RuntimeError => new SubmissionRuntimeError
            {
                Error = submission.Status.Error
            },
            _ => throw new ArgumentOutOfRangeException()
        };
    }

    public static async Task<Problem> GetProblemAsync(
        [Parent] Submission submission,
        IProblemsByIdDataLoader problemsByIdDataLoader
    )
    {
        var problem =
            await problemsByIdDataLoader.LoadAsync(submission.ProblemId);
        return problem!;
    }
}

[UnionType("Status")]
public interface ISubmissionStatus
{
}

public record SubmissionPending : ISubmissionStatus
{
    public string Message => "Pending";
}

public record SubmissionCompiling : ISubmissionStatus
{
    public string Message => "Compiling";
}

public record SubmissionEvaluating : ISubmissionStatus
{
    public string Message => "Evaluating";
}

public record SubmissionAccepted : ISubmissionStatus
{
    public string Message => "Accepted";
}

public record SubmissionRejected : ISubmissionStatus
{
    public TestCase TestCase { get; init; } = default!;
    public string ActualOutput { get; init; } = default!;

    public string Message =>
        $"Rejected: expected {TestCase.Output}, got {ActualOutput} on test case {TestCase.Key}";
}

public record SubmissionCompileError : ISubmissionStatus
{
    public string Error { get; init; } = default!;

    public string Message => $"Compile error: {Error}";
}

public record SubmissionRuntimeError : ISubmissionStatus
{
    public string Error { get; init; } = default!;

    public string Message => $"Runtime error: {Error}";
}

public static class SubmissionNodeExtensions
{
    public static IRequestExecutorBuilder RegisterSubmissionsTypes(
        this IRequestExecutorBuilder builder)
    {
        builder.AddType<SubmissionPending>()
            .AddType<SubmissionCompiling>()
            .AddType<SubmissionEvaluating>()
            .AddType<SubmissionAccepted>()
            .AddType<SubmissionRejected>()
            .AddType<SubmissionCompileError>()
            .AddType<SubmissionRuntimeError>();

        return builder;
    }
}