using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Infrastructure.Persistence.Mappings;

internal class ProblemMapping : IEntityTypeConfiguration<Problem>
{
    public void Configure(EntityTypeBuilder<Problem> builder)
    {
        builder.Property(p => p.Id).ValueGeneratedNever();

        builder.Property(p => p.Title).HasMaxLength(100);

        builder.Property(p => p.Slug).HasMaxLength(100);

        builder.Property(p => p.Description).HasMaxLength(1000);

        builder.OwnsMany(p => p.TestCases,
            navigationBuilder => { navigationBuilder.ToJson(); });
    }
}