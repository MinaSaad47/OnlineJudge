using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Types.Submissions.Inputs;

public record SubmitAnswerInput(
    [property: ID<Problem>] Guid ProblemId,
    string SourceCode,
    string LanguageId
);