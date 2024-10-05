using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace OnlineJudge.API.Infrastructure.Auth;

public class ConfigureJwtBearerOptions(
    IOptions<AuthOptions> authOptions
)
    : IConfigureNamedOptions<JwtBearerOptions>
{
    public void Configure(JwtBearerOptions options)
    {
        var authOpts = authOptions.Value;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = authOpts.Issuer,
            ValidAudience = authOpts.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(authOpts.SecretKey))
        };
        options.MapInboundClaims = false;
    }

    public void Configure(string? name, JwtBearerOptions options)
    {
        Configure(options);
    }
}