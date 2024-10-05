using HotChocolate.Types.Pagination;
using Microsoft.EntityFrameworkCore;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Infrastructure.Persistence;
using OnlineJudge.API.Types.Shared;
using Submission = OnlineJudge.API.Domain.Entities.Submission;

namespace OnlineJudge.API.Types.Submissions;

[QueryType]
public static class SubmissionQueries
{
    [NodeResolver]
    public static Task<Submission?> GetSubmissionByIdAsync(
        Guid id,
        [Service] OnlineJudgeContext context
    )
    {
        return context
            .Submissions
            .FirstOrDefaultAsync(s => s.Id == id);
    }


    [UseOffsetPaging]
    public static ValueTask<CollectionSegment<Submission>> GetSubmissionsAsync(
        [CurrentUser] User? user,
        [Service] OnlineJudgeContext context,
        int? skip,
        int? take)
    {
        if (user is null) return default!;

        return context.Submissions
            .Where(s => s.SubmitterId == user.Id)
            .OrderBy(p => p.Status.Kind)
            .ThenBy(p => p.Id)
            .ApplyOffsetPaginationAsync(skip, take);
    }
}