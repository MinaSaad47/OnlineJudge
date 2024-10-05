using MediatR;
using Microsoft.AspNetCore.Identity;
using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Application.Users.Queries;

public sealed record GetUserRolesQuery(Guid UserId)
    : IRequest<IReadOnlyCollection<string>>;

public class GetUserRolesHandler(UserManager<User> userManager)
    : IRequestHandler<GetUserRolesQuery,
        IReadOnlyCollection<string>>
{
    public async Task<IReadOnlyCollection<string>> Handle(
        GetUserRolesQuery request,
        CancellationToken cancellationToken)
    {
        if (await userManager.FindByIdAsync(request.UserId.ToString()) is not
            { } user)
            throw DomainExceptions.UserNotFoundException.Id(request.UserId);

        var rules = await userManager.GetRolesAsync(user);

        return rules.AsReadOnly();
    }
}