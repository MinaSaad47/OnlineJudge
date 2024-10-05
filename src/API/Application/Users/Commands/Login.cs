using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Infrastructure.Auth;

namespace OnlineJudge.API.Application.Users.Commands;

public record LoginCommand(
    string Email,
    string Password
) : IRequest<LoginResult>;

public record LoginResult(User Me, string AccessToken, string RefreshToken);

public class LoginCommandValidator : AbstractValidator<LoginCommand>
{
    public LoginCommandValidator()
    {
        RuleFor(x => x.Email)
            .EmailAddress()
            .NotEmpty();
        RuleFor(x => x.Password)
            .NotEmpty();
    }
}

public class LoginHandler(
    UserManager<User> userManager,
    ITokenProvider tokenProvider)
    : IRequestHandler<LoginCommand, LoginResult>
{
    public async Task<LoginResult> Handle(
        LoginCommand request,
        CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email) ??
                   throw new DomainExceptions.InvalidCredentialsException();

        if (!await userManager.CheckPasswordAsync(user, request.Password))
            throw new DomainExceptions.InvalidCredentialsException();

        var (accessToken, refreshToken) = tokenProvider.CreateTokens(user);

        return new LoginResult(user, accessToken, refreshToken);
    }
}