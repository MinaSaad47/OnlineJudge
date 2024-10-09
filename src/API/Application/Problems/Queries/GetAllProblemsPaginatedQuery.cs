using HotChocolate.Pagination;
using MediatR;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Infrastructure.Persistence;

namespace OnlineJudge.API.Application.Problems.Queries;

public sealed record GetAllProblemsPaginatedQuery(PagingArguments PagingArgs)
    : IRequest<Page<Problem>>;

public sealed class GetProblemsHandler(OnlineJudgeContext context)
    : IRequestHandler<GetAllProblemsPaginatedQuery, Page<Problem>>
{
    public async Task<Page<Problem>> Handle(
        GetAllProblemsPaginatedQuery request,
        CancellationToken cancellationToken)
    {
        return await context
            .Problems
            .OrderBy(p => p.Slug)
            .ToPageAsync(request.PagingArgs, cancellationToken);
    }
}