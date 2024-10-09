using MediatR;
using Microsoft.EntityFrameworkCore;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Infrastructure.Persistence;

namespace OnlineJudge.API.Application.Submissions.Queries;

public sealed record GetSubmissionQuery(User CurrentUser, Guid Id)
    : IRequest<Submission?>;

public class
    GetSubmissionHandler(OnlineJudgeContext context)
    : IRequestHandler<GetSubmissionQuery, Submission?>
{
    public Task<Submission?> Handle(
        GetSubmissionQuery request,
        CancellationToken cancellationToken)
    {
        return context.Submissions
            .Where(s =>
                s.Id == request.Id && s.SubmitterId == request.CurrentUser.Id)
            .FirstOrDefaultAsync(cancellationToken);
    }
}