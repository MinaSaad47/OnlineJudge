using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Infrastructure.Persistence.Mappings;

public class UserMapping : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasMany(u => u.Submissions)
            .WithOne(s => s.Submitter)
            .HasForeignKey(s => s.SubmitterId);
    }
}