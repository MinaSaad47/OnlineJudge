using HotChocolate.Types.Pagination;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Infrastructure.Persistence;

namespace OnlineJudge.API.Types.Problems;

[ObjectType<Problem>]
public static partial class ProblemNode
{
    static partial void Configure(IObjectTypeDescriptor<Problem> descriptor)
    {
    }

    public static string MaxMemoryString([Parent] Problem problem)
    {
        return problem.MaxMemory + " MegaBytes";
    }

    public static string MaxTimeString([Parent] Problem problem)
    {
        return problem.MaxTime.TotalSeconds.ToString("0.00") + " Sec";
    }

    [UseOffsetPaging]
    public static ValueTask<CollectionSegment<Submission>> GetSubmissionsAsync(
        [Parent] Problem problem,
        [Service] OnlineJudgeContext context,
        CancellationToken cancellationToken)
    {
        return context.Submissions
            .Where(s => s.ProblemId == problem.Id)
            .ApplyOffsetPaginationAsync(0, 10, cancellationToken);
    }
}