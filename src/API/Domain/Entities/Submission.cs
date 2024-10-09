namespace OnlineJudge.API.Domain.Entities;

public class Submission
{
    public Guid Id { get; init; }
    public Guid SubmitterId { get; init; }
    public Guid ProblemId { get; init; }
    public Guid? ContestId { get; init; }
    public string SourceCode { get; init; } = default!;
    public string LanguageId { get; init; } = default!;
    public SubmissionStatus Status { get; set; } = SubmissionStatus.Pending();
    public DateTimeOffset SubmittedAt { get; init; } = DateTimeOffset.UtcNow;

    public User Submitter { get; init; } = default!;
    public Problem Problem { get; init; } = default!;
    public Contest? Contest { get; init; } = default!;
    public Language Language { get; init; } = default!;

    public bool IsFinished => Status.Kind is SubmissionStatusKind.Accepted
        or SubmissionStatusKind.Rejected
        or SubmissionStatusKind.CompileError
        or SubmissionStatusKind.RuntimeError;
}

public enum SubmissionStatusKind
{
    Pending,
    Compiling,
    Evaluating,
    Accepted,
    Rejected,
    CompileError,
    RuntimeError
}

public class SubmissionStatus
{
    public SubmissionStatusKind Kind { get; init; }
    public string? Error { get; init; }
    public string? ActualOutput { get; init; }
    public TestCase? TestCase { get; init; }

    public static SubmissionStatus Pending()
    {
        return new SubmissionStatus { Kind = SubmissionStatusKind.Pending };
    }

    public static SubmissionStatus Compiling()
    {
        return new SubmissionStatus { Kind = SubmissionStatusKind.Compiling };
    }

    public static SubmissionStatus Evaluating()
    {
        return new SubmissionStatus { Kind = SubmissionStatusKind.Evaluating };
    }

    public static SubmissionStatus Accepted()
    {
        return new SubmissionStatus { Kind = SubmissionStatusKind.Accepted };
    }

    public static SubmissionStatus Rejected(
        TestCase testCase,
        string actualOutput)
    {
        return new SubmissionStatus
        {
            Kind = SubmissionStatusKind.Rejected,
            TestCase = testCase,
            ActualOutput = actualOutput
        };
    }

    public static SubmissionStatus CompileError(string error)
    {
        return new SubmissionStatus
            { Kind = SubmissionStatusKind.CompileError, Error = error };
    }

    public static SubmissionStatus RuntimeError(string error)
    {
        return new SubmissionStatus
            { Kind = SubmissionStatusKind.RuntimeError, Error = error };
    }
}

public static partial class DomainExceptions
{
    public class SubmissionNotFoundException(Guid id)
        : Exception($"Submission with id {id} not found");
}