using HotChocolate.Authorization;
using MediatR;
using OnlineJudge.API.Application.Users.Queries;
using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Types.Users;

[ObjectType<User>]
public static partial class UserNode
{
    static partial void Configure(IObjectTypeDescriptor<User> descriptor)
    {
        descriptor.BindFieldsExplicitly();

        descriptor.Field(u => u.Id);
        descriptor.Field(u => u.UserName);
        descriptor.Field(u => u.Email);
        descriptor.Field(u => u.PhoneNumber);
    }

    public static Guid InternalId([Parent] User user)
    {
        return user.Id;
    }

    [Authorize]
    public static Task<IReadOnlyCollection<string>> Roles(
        [Parent] User user,
        ISender sender,
        CancellationToken cancellationToken)
    {
        return sender.Send(new GetUserRolesQuery(user.Id),
            cancellationToken);
    }
}