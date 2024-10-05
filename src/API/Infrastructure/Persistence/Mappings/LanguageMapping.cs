using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Infrastructure.Persistence.Mappings;

public class LanguageMapping : IEntityTypeConfiguration<Language>
{
    public void Configure(EntityTypeBuilder<Language> builder)
    {
        builder.HasData([
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
        ]);
    }
}