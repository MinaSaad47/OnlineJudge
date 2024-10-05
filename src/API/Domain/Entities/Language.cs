namespace OnlineJudge.API.Domain.Entities;

public class Language
{
    public string Id { get; init; } = default!;
    public string Name { get; init; } = default!;
    public string SourceFile { get; init; } = default!;
    public string? CompileCmd { get; init; }
    public string RunCmd { get; init; } = default!;
}

public static partial class DomainExceptions
{
    public class LanguageNotFoundException(string id)
        : Exception($"Language with id {id} not found");
}