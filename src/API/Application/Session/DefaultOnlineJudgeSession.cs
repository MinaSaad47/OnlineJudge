using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Application.Session;

public class DefaultOnlineJudgeSession : IOnlineJudgeSession
{
    public Guid CurrentUserId { get; set; } = Guid.Empty;
    public User? CurrentUser { get; set; }
}