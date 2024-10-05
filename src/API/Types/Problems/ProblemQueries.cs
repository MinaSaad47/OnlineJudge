using HotChocolate.Types.Pagination;
using Microsoft.EntityFrameworkCore;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Infrastructure.Persistence;

namespace OnlineJudge.API.Types.Problems;

[QueryType]
public static class ProblemQueries
{
    [UseOffsetPaging]
    public static ValueTask<CollectionSegment<Problem>> GetProblemsAsync(
        [Service] OnlineJudgeContext context,
        int? skip,
        int? take)
    {
        return context.Problems
            .OrderBy(p => p.Title)
            .ThenBy(p => p.Id)
            .ApplyOffsetPaginationAsync(skip, take);
    }

    [NodeResolver]
    public static Task<Problem?> GetProblemByIdAsync(
        Guid id,
        [Service] OnlineJudgeContext context,
        CancellationToken cancellationToken
    )
    {
        return context.Problems.FirstOrDefaultAsync(p => p.Id == id,
            cancellationToken);
    }

    public static Task<Problem?> GetProblemBySlugAsync(
        string slug,
        [Service] OnlineJudgeContext context,
        CancellationToken cancellationToken
    )
    {
        return context.Problems.FirstOrDefaultAsync(p => p.Slug == slug,
            cancellationToken);
    }
}