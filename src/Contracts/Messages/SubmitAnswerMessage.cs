namespace OnlineJudge.Contracts.Messages;

public record SubmitAnswerMessage(
    Guid SubmissionId,
    string SourceCode,
    string SourceFile,
    string? CompileCmd,
    string RunCmd,
    int MemoryLimit,
    TimeSpan TimeLimit,
    TestCase[] TestCases
);

public record TestCase(int Key, string Input, string Output, bool IsSample);

public record SubmissionJudgedMessage(
    Guid SubmissionId,
    JudgeStatus Status
);

public enum JudgeStatusKind
{
    Compiling,
    Evaluating,
    Accepted,
    Rejected,
    CompileError,
    RuntimeError
}

public class JudgeStatus
{
    public JudgeStatusKind Kind { get; init; }
    public string? Error { get; init; }
    public string? ActualOutput { get; init; }
    public TestCase? TestCase { get; init; }


    public static JudgeStatus Compiling()
    {
        return new JudgeStatus { Kind = JudgeStatusKind.Compiling };
    }

    public static JudgeStatus Evaluating()
    {
        return new JudgeStatus { Kind = JudgeStatusKind.Evaluating };
    }

    public static JudgeStatus Accepted()
    {
        return new JudgeStatus { Kind = JudgeStatusKind.Accepted };
    }

    public static JudgeStatus Rejected(
        TestCase testCase,
        string actualOutput)
    {
        return new JudgeStatus
        {
            Kind = JudgeStatusKind.Rejected,
            TestCase = testCase,
            ActualOutput = actualOutput
        };
    }

    public static JudgeStatus CompileError(string error)
    {
        return new JudgeStatus
            { Kind = JudgeStatusKind.CompileError, Error = error };
    }

    public static JudgeStatus RuntimeError(string error)
    {
        return new JudgeStatus
            { Kind = JudgeStatusKind.RuntimeError, Error = error };
    }
}