namespace OnlineJudge.Executor;

public class CodeExecutor
{
    private readonly ILogger<CodeExecutor> _logger;

    public CodeExecutor(ILogger<CodeExecutor> logger)
    {
        _logger = logger;
    }

    public async Task ExecuteAsync(CodeExecutorOptions options, CancellationToken stoppingToken)
    {
        if (!string.IsNullOrEmpty(options.CompileCommand))
        {
            _logger.LogInformation("Compile {Language} Code", options.Language);
        }
        
        _logger.LogInformation("Running {Language} Code", options.Language);

        await Task.CompletedTask;
    }
}