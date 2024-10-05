using MediatR;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Types.Shared;
using OnlineJudge.API.Types.Shared.Mapping;
using OnlineJudge.API.Types.Submissions.Inputs;

namespace OnlineJudge.API.Types.Submissions;

[MutationType]
public static class SubmissionMutations
{
    public static Task<Submission> SubmitAnswerAsync(
        [CurrentUser] User user,
        SubmitAnswerInput input,
        ISender sender,
        CancellationToken cancellationToken
    )
    {
        return sender.Send(input.MapToCommand(user), cancellationToken);
    }
}