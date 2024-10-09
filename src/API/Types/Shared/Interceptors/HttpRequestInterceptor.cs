using System.Security.Claims;
using HotChocolate.AspNetCore;
using HotChocolate.Execution;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.JsonWebTokens;
using OnlineJudge.API.Application.Session;
using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Types.Interceptors;

public class HttpRequestInterceptor : DefaultHttpRequestInterceptor
{
    public override async ValueTask OnCreateAsync(
        HttpContext context,
        IRequestExecutor requestExecutor,
        OperationRequestBuilder requestBuilder,
        CancellationToken cancellationToken)
    {
        OnlineJudgeSession session = new();

        if (context.User.FindFirstValue(JwtRegisteredClaimNames.Sub) is
            {
            }
            userId)
        {
            using var userManager = context.RequestServices
                .GetRequiredService<UserManager<User>>();
            var user = await userManager.FindByIdAsync(userId);

            session = session with { CurrentUser = user };
        }

        requestBuilder.SetGlobalState(nameof(OnlineJudgeSession),
            session);


        await base.OnCreateAsync(context,
            requestExecutor,
            requestBuilder,
            cancellationToken);
    }
}