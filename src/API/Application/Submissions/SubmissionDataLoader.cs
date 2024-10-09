using HotChocolate.Pagination;
using Microsoft.EntityFrameworkCore;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Infrastructure.Persistence;

namespace OnlineJudge.API.Application.Submissions;

public static class SubmissionDataLoaders
{
    public const string SubmitterKey = "submitter";

    [DataLoader]
    public static async Task<IReadOnlyDictionary<Guid, Page<Submission>>>
        GetSubmissionsByProblemIdAsync(
            IReadOnlyList<Guid> keys,
            OnlineJudgeContext context,
            PagingArguments pagingArgs,
            [DataLoaderState(SubmitterKey)] Guid? submitterId = null,
            CancellationToken cancellationToken = default
        )
    {
        var query = context.Submissions
            .AsNoTracking()
            .Where(p => keys.Contains(p.ProblemId));

        if (submitterId is not null)
            query = query
                .Where(s => s.SubmitterId == submitterId);

        var result = await query.OrderBy(s => s.SubmittedAt)
            .ThenBy(s => s.Id)
            .ToBatchPageAsync(t => t.Id,
                pagingArgs,
                cancellationToken);

        foreach (var key in keys) result.TryAdd(key, Page<Submission>.Empty);

        return result;
    }
}