using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Infrastructure.Auth;

public interface ITokenProvider
{
    (string accessToken, string refreshToken) CreateTokens(User user);
}