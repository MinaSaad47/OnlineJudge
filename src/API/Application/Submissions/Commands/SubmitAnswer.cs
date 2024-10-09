using Humanizer;
using MassTransit;
using MediatR;
using Microsoft.EntityFrameworkCore;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Infrastructure.Persistence;
using OnlineJudge.Contracts.Messages;
using TestCase = OnlineJudge.Contracts.Messages.TestCase;

namespace OnlineJudge.API.Application.Submissions.Commands;

public record SubmitAnswerCommand(
    User CurrentUser,
    Guid ProblemId,
    string SourceCode,
    string LanguageId
) : IRequest<Submission>;

public class SubmitAnswerHandler(
    OnlineJudgeContext context,
    IPublishEndpoint publishEndpoint)
    : IRequestHandler<SubmitAnswerCommand, Submission>
{
    public async Task<Submission> Handle(
        SubmitAnswerCommand request,
        CancellationToken cancellationToken)
    {
        var user = request.CurrentUser;

        if (await context.Problems.FirstOrDefaultAsync(
                p => p.Id == request.ProblemId,
                cancellationToken)
            is not { } problem)
            throw new DomainExceptions.ProblemNotFoundException(
                request.ProblemId);

        if (await context.Languages.FirstOrDefaultAsync(
                l => l.Id == request.LanguageId,
                cancellationToken) is not { } language)
            throw new DomainExceptions.LanguageNotFoundException(
                request.LanguageId);

        Submission submission = new()
        {
            Id = Guid.NewGuid(),
            ProblemId = request.ProblemId,
            SourceCode = request.SourceCode,
            LanguageId = request.LanguageId,
            Submitter = user
        };

        context.Submissions.Add(submission);

        await publishEndpoint.Publish(new SubmitAnswerMessage(submission.Id,
                submission.SourceCode,
                language.SourceFile,
                language.CompileCmd,
                language.RunCmd,
                (int)problem.MaxMemory.Megabytes().Kilobytes,
                problem.MaxTime,
                problem.TestCases
                    .Select(t =>
                        new TestCase(t.Key, t.Input, t.Output, t.IsSample))
                    .ToArray()),
            cancellationToken);

        await context.SaveChangesAsync(cancellationToken);

        return submission;
    }
}