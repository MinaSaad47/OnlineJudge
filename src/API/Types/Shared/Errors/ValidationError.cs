using FluentValidation;

namespace OnlineJudge.API.Types.Shared.Errors;

public class ValidationsError
{
    public List<ValidationError> Errors { get; init; } = [];

    public string Message => "validation error";

    private ValidationsError CreateErrorFrom(ValidationException ex)
    {
        return new ValidationsError
        {
            Errors = ex.Errors
                .Select(x => new ValidationError
                {
                    PropertyName = x.PropertyName,
                    ErrorMessage = x.ErrorMessage,
                    AttemptedValue = x.AttemptedValue
                })
                .ToList()
        };
    }
}

public class ValidationError
{
    public required string PropertyName { get; init; }
    public required string ErrorMessage { get; init; }
    public required object AttemptedValue { get; init; }
}