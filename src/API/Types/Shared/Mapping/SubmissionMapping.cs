using OnlineJudge.API.Application.Submissions.Commands;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Types.Submissions.Inputs;
using Riok.Mapperly.Abstractions;

namespace OnlineJudge.API.Types.Shared.Mapping;

[Mapper]
public static partial class SubmissionMapping
{
    public static partial SubmitAnswerCommand MapToCommand(
        this SubmitAnswerInput input,
        User currentUser);
}