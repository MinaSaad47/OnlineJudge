using System.ComponentModel.DataAnnotations;

namespace OnlineJudge.API.Infrastructure.Auth;

public class AuthOptions
{
    public const string SectionName = "AuthOptions";

    [Required] public string Issuer { get; init; } = default!;

    [Required] public string Audience { get; init; } = default!;

    [Required] public string SecretKey { get; init; } = default!;

    [Required] public int AccessTokenMinutes { get; init; }

    [Required] public int RefreshTokenMinutes { get; init; }
}