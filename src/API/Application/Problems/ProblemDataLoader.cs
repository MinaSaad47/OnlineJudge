using Microsoft.EntityFrameworkCore;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Infrastructure.Persistence;

namespace OnlineJudge.API.Application.Problems;

public static class ProblemDataLoader
{
    [DataLoader]
    public static async Task<Dictionary<Guid, Problem>> GetProblemByIdAsync(
        IReadOnlyList<Guid> ids,
        OnlineJudgeContext context,
        CancellationToken cancellationToken)
    {
        return await context
            .Problems
            .Where(p => ids.Contains(p.Id))
            .ToDictionaryAsync(p => p.Id, cancellationToken);
    }
}