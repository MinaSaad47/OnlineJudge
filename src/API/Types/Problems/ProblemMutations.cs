using MediatR;
using OnlineJudge.API.Application.Problems.Commands;
using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Types.Problems;

[MutationType]
public static class ProblemMutations
{
    public static Task<Problem> DeleteProblemAsync(
        [ID<Problem>] Guid id,
        ISender sender,
        CancellationToken cancellationToken)
    {
        return sender.Send(new DeleteProblemCommand(id), cancellationToken);
    }
}