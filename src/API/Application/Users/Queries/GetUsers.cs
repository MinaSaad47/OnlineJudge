using MediatR;
using Microsoft.EntityFrameworkCore;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Infrastructure.Persistence;

namespace OnlineJudge.API.Features.Users.Queries;

public sealed record GetUsersQuery : IRequest<IReadOnlyCollection<User>>;

public sealed class GetUsersHandler(OnlineJudgeContext context)
    : IRequestHandler<GetUsersQuery, IReadOnlyCollection<User>>
{
    public async Task<IReadOnlyCollection<User>> Handle(
        GetUsersQuery request,
        CancellationToken cancellationToken)
    {
        return await context.Users.ToListAsync(cancellationToken);
    }
}