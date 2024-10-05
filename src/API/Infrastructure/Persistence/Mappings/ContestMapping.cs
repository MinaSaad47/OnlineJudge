using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Infrastructure.Persistence.Mappings;

internal class ContestMapping : IEntityTypeConfiguration<Contest>
{
    public void Configure(EntityTypeBuilder<Contest> builder)
    {
        builder.Property(p => p.Title).HasMaxLength(100);

        builder.Property(p => p.Slug).HasMaxLength(100);

        builder.Property(p => p.Description).HasMaxLength(1000);

        builder.HasMany(c => c.Problems).WithMany();

        builder.HasMany(c => c.Submissions)
            .WithOne(s => s.Contest)
            .HasForeignKey(s => s.ContestId)
            .IsRequired(false);
    }
}