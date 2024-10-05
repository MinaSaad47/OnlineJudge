using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Application.Session;

public interface IOnlineJudgeSession
{
    public User? CurrentUser { get; }

    public User CurrentUserOrThrow
    {
        get
        {
            if (CurrentUser is null)
                throw new DomainExceptions.ForbiddenAccessException();
            return CurrentUser;
        }
    }
}