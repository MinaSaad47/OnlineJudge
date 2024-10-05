namespace OnlineJudge.API.Domain.Entities;

public class Problem
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = default!;
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public TimeSpan MaxTime { get; set; }
    public int MaxMemory { get; set; }
    public List<TestCase> TestCases { get; set; }

    public List<Submission> Submissions { get; } = [];
}

public class TestCase
{
    public TestCase()
    {
    }

    public TestCase(int key, string input, string output, bool isSample)
    {
        if (input.Length > 1024 || output.Length > 1024)
            throw new ArgumentException(
                "Input and output should be less than 1024 characters");


        Key = key;
        Input = input;
        Output = output;
        IsSample = isSample;
    }

    public int Key { get; set; }
    public string Input { get; set; } = default!;
    public string Output { get; set; } = default!;
    public bool IsSample { get; set; }
}

public static partial class DomainExceptions
{
    public class ProblemNotFoundException(Guid id)
        : Exception($"Problem with Id {id} not found");
}
