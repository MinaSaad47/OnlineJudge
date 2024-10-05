using MediatR;
using OnlineJudge.API.Application.Users.Queries;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Features.Users.Queries;
using OnlineJudge.API.Types.Shared;

namespace OnlineJudge.API.Types.Users;

[QueryType]
public static class UserQueries
{
    public static Task<IReadOnlyCollection<User>> GetUsersAsync(
        ISender sender,
        CancellationToken cancellationToken)
    {
        return sender.Send(new GetUsersQuery(), cancellationToken);
    }

    [NodeResolver]
    public static Task<User?> GetUserByIdAsync(
        Guid id,
        ISender sender,
        CancellationToken cancellationToken)
    {
        return sender.Send(new GetUserByIdQuery(id), cancellationToken);
    }

    public static User? GetMe(
        [CurrentUser] User user,
        CancellationToken cancellationToken)
    {
        return user;
    }
}