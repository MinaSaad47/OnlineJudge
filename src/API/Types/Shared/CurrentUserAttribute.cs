namespace OnlineJudge.API.Types.Shared;

public class CurrentUserAttribute() : GlobalStateAttribute(StateName)
{
    public const string StateName = "CurrentUser";
}