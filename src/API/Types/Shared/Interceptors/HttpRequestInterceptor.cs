using System.Security.Claims;
using HotChocolate.AspNetCore;
using HotChocolate.Execution;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.JsonWebTokens;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Types.Shared;

namespace OnlineJudge.API.Types.Interceptors;

public class HttpRequestInterceptor : DefaultHttpRequestInterceptor
{
    public override async ValueTask OnCreateAsync(
        HttpContext context,
        IRequestExecutor requestExecutor,
        OperationRequestBuilder requestBuilder,
        CancellationToken cancellationToken)
    {
        await base.OnCreateAsync(context,
            requestExecutor,
            requestBuilder,
            cancellationToken);


        if (context.User.FindFirstValue(JwtRegisteredClaimNames.Sub) is string
            userId)
        {
            using var userManager = context.RequestServices
                .GetRequiredService<UserManager<User>>();
            var user = await userManager.FindByIdAsync(userId);
            requestBuilder.TryAddGlobalState(CurrentUserAttribute.StateName,
                user);
        }
    }
}