using MediatR;
using OnlineJudge.API.Application.Session;
using OnlineJudge.API.Application.Users.Queries;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Features.Users.Queries;

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
        OnlineJudgeSession session,
        CancellationToken cancellationToken)
    {
        return session.CurrentUser;
    }
}