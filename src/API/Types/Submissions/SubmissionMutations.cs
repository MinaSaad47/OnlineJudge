using HotChocolate.Authorization;
using HotChocolate.Subscriptions;
using MediatR;
using OnlineJudge.API.Application.Session;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Types.Shared.Mapping;
using OnlineJudge.API.Types.Submissions.Inputs;

namespace OnlineJudge.API.Types.Submissions;

[MutationType]
public static class SubmissionMutations
{
    [Authorize]
    public static async Task<Submission> SubmitAnswerAsync(
        OnlineJudgeSession session,
        SubmitAnswerInput input,
        ISender sender,
        ITopicEventSender eventSender,
        CancellationToken cancellationToken
    )
    {
        var submission = await sender.Send(
            input.MapToCommand(session.CurrentUser!),
            cancellationToken);

        await eventSender
            .SendAsync(Topics.Submission + submission.Id,
                submission,
                cancellationToken);

        return submission;
    }
}