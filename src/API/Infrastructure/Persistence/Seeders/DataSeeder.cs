using Microsoft.EntityFrameworkCore;
using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Infrastructure.Persistence.Seeders;

public class DataSeeder(
    OnlineJudgeContext context,
    ILogger<DataSeeder> logger)
{
    public async Task SeedAsync()
    {
        await SeedProblems();
        await SeedLanguages();

        logger.LogInformation("Seeding ...");
        var result = await context.SaveChangesAsync();
        logger.LogInformation("Seeded {Result} rows successfully.", result);
    }

    private async Task SeedLanguages()
    {
        Language[] languages =
        [
            new Language
            {
                Id = "cpp",
                Name = "C++",
                SourceFile = "main.cpp",
                CompileCmd = "g++ -o main.cpp",
                RunCmd = "./a.out"
            },
            new Language
            {
                Id = "c",
                Name = "C",
                SourceFile = "main.c",
                CompileCmd = "gcc -o main.c",
                RunCmd = "./a.out"
            },
            new Language
            {
                Id = "java",
                Name = "Java",
                SourceFile = "Main.java",
                CompileCmd = "javac Main.java",
                RunCmd = "java Main"
            },
            new Language
            {
                Id = "py",
                Name = "Python",
                SourceFile = "main.py",
                RunCmd = "python3 main.py"
            }
        ];

        var ids = languages.Select(l => l.Id);

        if (!await context.Languages.AnyAsync(l => ids.Contains(l.Id)))
            await context.Languages.AddRangeAsync(languages);
    }

    private async Task SeedProblems()
    {
        var problems = new List<Problem>
        {
            new()
            {
                Id = Guid.Parse("ECDEB141-A6C8-43CD-9CC3-A9461ED6D4D8"),
                Slug = "two-sum",
                Title = "Two Sum",
                Description = "Find two numbers that add up to a target.",
                MaxMemory = 256,
                MaxTime = TimeSpan.FromSeconds(2),
                TestCases =
                [
                    new TestCase(1, "[2, 7, 11, 15]\\n9", "[0, 1]", true),
                    new TestCase(2, "[3, 2, 4]\\n6", "[1, 2]", false)
                ]
            },
            new()
            {
                Id = Guid.Parse("E6F9F6B7-0F4F-4C2A-9B5A-4A4C0D0E0F0F"),
                Slug = "reverse-string",
                Title = "Reverse String",
                Description = "Reverse the provided string.",
                MaxMemory = 256,
                MaxTime = TimeSpan.FromSeconds(2),
                TestCases =
                [
                    new TestCase(1, "hello", "olleh", true),
                    new TestCase(2, "world", "dlrow", false)
                ]
            }
        };

        var ids = problems.Select(p => p.Id).ToList();

        if (await context.Problems.AnyAsync(p => ids.Contains(p.Id))) return;

        await context.Problems.AddRangeAsync(problems);
    }
}