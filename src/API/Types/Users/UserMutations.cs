using MediatR;
using OnlineJudge.API.Application.Users.Commands;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Features.Users.Commands;
using OnlineJudge.API.Types.Shared.Middlewares;

namespace OnlineJudge.API.Types.Users;

[MutationType]
public static class UserMutations
{
    [UseFluentValidation]
    [Error<DomainExceptions.RegistrationFailedException>]
    public static Task<RegisterResult> RegisterAsync(
        RegisterCommand command,
        ISender sender,
        CancellationToken cancellationToken)
    {
        return sender.Send(command, cancellationToken);
    }

    [UseFluentValidation]
    [Error<DomainExceptions.InvalidCredentialsException>]
    public static Task<LoginResult> LoginAsync(
        LoginCommand command,
        ISender sender,
        CancellationToken cancellationToken)
    {
        return sender.Send(command, cancellationToken);
    }
}