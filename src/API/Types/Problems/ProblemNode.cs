using HotChocolate.Authorization;
using HotChocolate.Pagination;
using HotChocolate.Types.Pagination;
using MediatR;
using OnlineJudge.API.Application.Problems.Queries;
using OnlineJudge.API.Application.Session;
using OnlineJudge.API.Domain.Entities;

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

    [Authorize]
    [UsePaging]
    public static Task<Connection<Submission>> GetSubmissionsAsync(
        [Parent] Problem problem,
        PagingArguments pagingArgs,
        OnlineJudgeSession session,
        ISender sender,
        CancellationToken cancellationToken)
    {
        return sender.Send(new GetProblemSubmissionsQuery(problem.Id,
                    pagingArgs,
                    session.CurrentUser!),
                cancellationToken)
            .ToConnectionAsync();
    }
}