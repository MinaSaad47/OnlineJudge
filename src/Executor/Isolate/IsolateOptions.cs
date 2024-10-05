namespace OnlineJudge.Executor.Isolate;

public class IsolateOptions
{
    public const string SectionName = "Isolate";

    public uint FileSizeLimitInKB { get; init; }
    public uint StackLimitInKB { get; init; }
    public uint MemoryLimitInKB { get; init; }
    public double ExtraTimeLimitInSec { get; init; }
    public double TimeLimitInSec { get; init; }
    public double WallTimeLimitInSec { get; init; }
    public uint ProcessCountLimit { get; init; }
    public string[] EnvironmentVariables { get; init; } = [];
}