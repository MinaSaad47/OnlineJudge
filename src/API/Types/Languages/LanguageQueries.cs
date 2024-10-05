using Microsoft.EntityFrameworkCore;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Infrastructure.Persistence;

namespace OnlineJudge.API.Types.Languages;

[QueryType]
public static class LanguageQueries
{
    public static async Task<IReadOnlyCollection<Language>> GetLanguagesAsync(
        [Service] OnlineJudgeContext context
    )
    {
        return await context.Languages.ToListAsync();
    }
}