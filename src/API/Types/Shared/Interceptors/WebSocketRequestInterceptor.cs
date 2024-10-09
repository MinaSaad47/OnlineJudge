using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using HotChocolate.AspNetCore;
using HotChocolate.AspNetCore.Subscriptions;
using HotChocolate.AspNetCore.Subscriptions.Protocols;
using HotChocolate.Execution;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OnlineJudge.API.Application.Session;
using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Types.Shared.Interceptors;

public class WebSocketRequestInterceptor : DefaultSocketSessionInterceptor
{
    public override async ValueTask<ConnectionStatus> OnConnectAsync(
        ISocketSession session,
        IOperationMessagePayload connectionInitMessage,
        CancellationToken cancellationToken = new())
    {
        if (connectionInitMessage.As<InitMessage>() is InitMessage initMessage)
        {
            var handler = new JwtSecurityTokenHandler
            {
                MapInboundClaims = false
            };
            var token = initMessage.Authorization.Split("Bearer ")[1];
            try
            {
                await using var scope = session.Connection.HttpContext
                    .RequestServices.CreateAsyncScope();

                var parameters = scope
                    .ServiceProvider
                    .GetRequiredService<IOptions<JwtBearerOptions>>()
                    .Value.TokenValidationParameters;

                var principal = handler.ValidateToken(token,
                    parameters,
                    out var securityToken);
                session.Connection.HttpContext.User = principal;
            }
            catch (SecurityTokenException e)
            {
                return ConnectionStatus.Reject();
            }
        }


        return await base.OnConnectAsync(session,
            connectionInitMessage,
            cancellationToken);
    }

    public override async ValueTask OnRequestAsync(
        ISocketSession session,
        string operationSessionId,
        OperationRequestBuilder requestBuilder,
        CancellationToken cancellationToken = new())
    {
        OnlineJudgeSession onlineJudgeSession = new();

        if (session.Connection.HttpContext.User.FindFirstValue(
                JwtRegisteredClaimNames.Sub) is
            {
            }
            userId)
        {
            using var userManager = session.Connection.HttpContext
                .RequestServices
                .GetRequiredService<UserManager<User>>();
            var user = await userManager.FindByIdAsync(userId);
            onlineJudgeSession = onlineJudgeSession with { CurrentUser = user };
        }

        requestBuilder.SetGlobalState(nameof(OnlineJudgeSession),
            onlineJudgeSession);


        await base.OnRequestAsync(session,
            operationSessionId,
            requestBuilder,
            cancellationToken);
    }

    private record InitMessage(string Authorization);
}