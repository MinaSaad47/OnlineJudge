using HotChocolate.Authorization;
using HotChocolate.Subscriptions;
using MediatR;
using OnlineJudge.API.Application.Session;
using OnlineJudge.API.Application.Submissions.Queries;
using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Types.Submissions;

[SubscriptionType]
public static class SubmissionSubscriptions
{
    [Authorize]
    public static async IAsyncEnumerable<Submission> SubmissionStream(
        [ID<Submission>] Guid id,
        OnlineJudgeSession session,
        ISender sender,
        ITopicEventReceiver receiver
    )
    {
        var eventStream = await receiver
            .SubscribeAsync<Submission>(Topics.Submission + id);

        if (await sender.Send(new GetSubmissionQuery(session.CurrentUser!, id))
            is not { } userSubmission)
            throw new DomainExceptions.SubmissionNotFoundException(id);

        yield return userSubmission;
        if (userSubmission.IsFinished) yield break;

        await foreach (var submission in eventStream.ReadEventsAsync())
        {
            yield return submission;
            if (submission.IsFinished) yield break;
        }
    }


    [Subscribe(With = nameof(SubmissionStream))]
    public static Submission OnSubmission(
        [EventMessage] Submission submission
    )
    {
        return submission;
    }
}