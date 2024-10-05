using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Infrastructure.Auth;

public class TokenProvider(IOptions<AuthOptions> authOptions) : ITokenProvider
{
    public (string accessToken, string refreshToken) CreateTokens(User user)
    {
        var options = authOptions.Value;

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(options.SecretKey));

        var signingCredentials =
            new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims =
            new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!)
            };

        var accessToken = new JwtSecurityToken(options.Issuer,
            options.Audience,
            claims,
            expires: DateTime.UtcNow.AddMinutes(options.AccessTokenMinutes),
            signingCredentials: signingCredentials);

        var refreshToken = new JwtSecurityToken(options.Issuer,
            options.Audience,
            claims,
            expires: DateTime.UtcNow.AddMinutes(options.RefreshTokenMinutes),
            signingCredentials: signingCredentials);

        var handler = new JwtSecurityTokenHandler();

        return (handler.WriteToken(accessToken),
            handler.WriteToken(refreshToken));
    }
}