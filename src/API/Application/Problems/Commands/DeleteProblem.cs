using MediatR;
using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Application.Problems.Commands;

public sealed record DeleteProblemCommand(Guid Id) : IRequest<Problem>;

public sealed class
    DeleteProblemHandler : IRequestHandler<DeleteProblemCommand, Problem>
{
    public Task<Problem> Handle(
        DeleteProblemCommand request,
        CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}