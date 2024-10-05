using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Infrastructure.Auth;

namespace OnlineJudge.API.Features.Users.Commands;

public record RegisterCommand(
    string UserName,
    string Email,
    string Password
) : IRequest<RegisterResult>;

public sealed record RegisterResult(
    User Me,
    string AccessToken,
    string RefreshToken);

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(x => x.UserName)
            .NotEmpty();
        RuleFor(x => x.Email)
            .NotEmpty();
        RuleFor(x => x.Password)
            .NotEmpty();
    }
}

public class RegisterHandler(
    UserManager<User> userManager,
    ITokenProvider tokenProvider)
    : IRequestHandler<RegisterCommand, RegisterResult>
{
    public async Task<RegisterResult> Handle(
        RegisterCommand request,
        CancellationToken cancellationToken)
    {
        var newUser = new User
        {
            UserName = request.UserName,
            Email = request.Email
        };

        var result =
            await userManager.CreateAsync(newUser, request.Password);

        if (!result.Succeeded)
            throw new DomainExceptions.RegistrationFailedException(result.Errors
                .Select(e => e.Description)
                .ToList());

        var (accessToken, refreshToken) = tokenProvider.CreateTokens(newUser);

        return new RegisterResult(newUser, accessToken, refreshToken);
    }
}