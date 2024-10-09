using HotChocolate.Pagination;
using HotChocolate.Types.Pagination;
using MediatR;
using Microsoft.EntityFrameworkCore;
using OnlineJudge.API.Application.Problems.Queries;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Infrastructure.Persistence;

namespace OnlineJudge.API.Types.Problems;

[QueryType]
public static class ProblemQueries
{
    [UsePaging]
    public static Task<Connection<Problem>> GetProblemsAsync(
        PagingArguments pagingArgs,
        ISender sender
    )
    {
        return sender.Send(new GetAllProblemsPaginatedQuery(pagingArgs))
            .ToConnectionAsync();
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