namespace OnlineJudge.Executor;

public class CodeExecutorOptions
{

    public required string Code { get; set; }
    public required string Language { get; set; }
    public required string Input { get; set; }
    public string? CompileCommand { get; set; }
    public required string RunCommand { get; set; }
}