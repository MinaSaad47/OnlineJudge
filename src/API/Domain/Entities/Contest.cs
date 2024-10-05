namespace OnlineJudge.API.Domain.Entities;

public class Contest
{
    public Guid Id { get; set; }
    public string Title { get; set; } = default!;
    public string Slug { get; set; } = default!;
    public string Description { get; set; } = default!;

    public List<Problem> Problems { get; } = [];
    public List<Submission> Submissions { get; } = [];
}

public static partial class DomainExceptions
{
}