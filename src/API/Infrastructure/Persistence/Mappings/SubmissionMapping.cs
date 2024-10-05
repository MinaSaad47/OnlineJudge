using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Infrastructure.Persistence.Mappings;

internal class SubmissionMapping : IEntityTypeConfiguration<Submission>
{
    public void Configure(EntityTypeBuilder<Submission> builder)
    {
        builder.OwnsOne(s => s.Status,
            propertyBuilder =>
            {
                propertyBuilder.ToJson();
                propertyBuilder.Property(s => s.Kind).HasConversion<string>();
                propertyBuilder.OwnsOne(s => s.TestCase);
            });
    }
}