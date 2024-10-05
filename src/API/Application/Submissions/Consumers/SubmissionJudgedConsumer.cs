using System.Diagnostics;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Infrastructure.Persistence;
using OnlineJudge.Contracts.Messages;
using TestCase = OnlineJudge.API.Domain.Entities.TestCase;

namespace OnlineJudge.API.Application.Submissions.Consumers;

public class SubmissionJudgedConsumer(OnlineJudgeContext context)
    : IConsumer<SubmissionJudgedMessage>
{
    public async Task Consume(
        ConsumeContext<SubmissionJudgedMessage> messageContext)
    {
        if (await context.Submissions.FirstOrDefaultAsync(s =>
                s.Id == messageContext.Message.SubmissionId) is not
            { } submission)
            return;

        TestCase? testCase = null;

        var newStatus = messageContext.Message.Status;

        if (newStatus.TestCase is not null)
            testCase = new TestCase
            {
                Key = newStatus.TestCase.Key,
                Input = newStatus.TestCase.Input,
                Output = newStatus.TestCase.Output,
                IsSample = newStatus.TestCase.IsSample
            };

        submission.Status = new SubmissionStatus
        {
            Kind = Enum.TryParse<SubmissionStatusKind>(
                newStatus.Kind.ToString(),
                out var kind)
                ? kind
                : throw new UnreachableException(),
            ActualOutput = newStatus.ActualOutput,
            Error = newStatus.Error,
            TestCase = testCase
        };

        await context.SaveChangesAsync();
    }
}