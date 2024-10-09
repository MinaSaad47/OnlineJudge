using MediatR;
using Microsoft.EntityFrameworkCore;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Infrastructure.Persistence;

namespace OnlineJudge.API.Application.Users.Queries;

public sealed record GetUserByIdQuery(Guid Id) : IRequest<User?>;

public sealed class GetUserByIdHandler(
    OnlineJudgeContext context)
    : IRequestHandler<GetUserByIdQuery, User?>
{
    public Task<User?> Handle(
        GetUserByIdQuery request,
        CancellationToken cancellationToken)
    {
        return context.Users
            .FirstOrDefaultAsync(u => u.Id == request.Id, cancellationToken);
    }
}