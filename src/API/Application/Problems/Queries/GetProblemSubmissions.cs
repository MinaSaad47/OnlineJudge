using HotChocolate.Pagination;
using MediatR;
using OnlineJudge.API.Application.Submissions;
using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Application.Problems.Queries;

public sealed record GetProblemSubmissionsQuery(
    Guid ProblemId,
    PagingArguments PagingArgs,
    User? CurrentUser = null
) : IRequest<Page<Submission>>;

public class GetProblemSubmissionHandler(
    ISubmissionsByProblemIdDataLoader dataLoader)
    : IRequestHandler<
        GetProblemSubmissionsQuery, Page<Submission>>
{
    public Task<Page<Submission>> Handle(
        GetProblemSubmissionsQuery request,
        CancellationToken cancellationToken)
    {
        return dataLoader.SetState(SubmissionDataLoaders.SubmitterKey,
                request.CurrentUser)
            .WithPagingArguments(request.PagingArgs)
            .LoadAsync(request.ProblemId, cancellationToken);
    }
}