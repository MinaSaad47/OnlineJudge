using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Application.Session;

public record OnlineJudgeSession(User? CurrentUser = null);