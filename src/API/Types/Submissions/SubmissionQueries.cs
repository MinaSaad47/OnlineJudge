using HotChocolate.Types.Pagination;
using Microsoft.EntityFrameworkCore;
using OnlineJudge.API.Application.Session;
using OnlineJudge.API.Infrastructure.Persistence;
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
        [GlobalState] OnlineJudgeSession session,
        [Service] OnlineJudgeContext context,
        int? skip,
        int? take)
    {
        if (session.CurrentUser is null) return default!;

        return context.Submissions
            .Where(s => s.SubmitterId == session.CurrentUser.Id)
            .OrderBy(p => p.Status.Kind)
            .ThenBy(p => p.Id)
            .ApplyOffsetPaginationAsync(skip, take);
    }
}