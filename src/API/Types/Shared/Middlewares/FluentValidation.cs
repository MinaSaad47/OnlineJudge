using System.Reflection;
using FluentValidation;
using FluentValidation.Results;
using HotChocolate.Types.Descriptors;

namespace OnlineJudge.API.Types.Shared.Middlewares;

public static class FluentValidationObjectFieldDescriptorExtensions
{
    public static IObjectFieldDescriptor UseFluentValidation(
        this IObjectFieldDescriptor descriptor
    )
    {
        descriptor.Extend().OnBeforeCreate((ctx, d) =>
            d.AddErrorType(ctx, typeof(ValidationException)));

        descriptor.Use(next => async context =>
        {
            // Iterate over all arguments of the field
            foreach (var argument in context.Selection.Field.Arguments)
            {
                var argumentValue =
                    context.ArgumentValue<object>(argument.Name);

                // Get the runtime type of the argument
                var argumentType = argumentValue.GetType();

                // Try to resolve the corresponding validator for the argument type
                var validatorType =
                    typeof(IValidator<>).MakeGenericType(argumentType);

                if (context.Services.GetService(validatorType) is IValidator
                    validator)
                {
                    // Dynamically invoke the ValidateAsync method
                    var validationTask =
                        (Task<ValidationResult>)validatorType.GetMethod(
                            "ValidateAsync",
                            [argumentType, typeof(CancellationToken)])!.Invoke(
                            validator,
                            new[] { argumentValue, context.RequestAborted })!;

                    // Wait for the validation result
                    var result =
                        await validationTask.ConfigureAwait(false);

                    if (!result.IsValid)
                        throw new ValidationException(result.Errors);
                }
            }

            // If validation passes for all inputs, proceed to the next middleware
            await next(context);
        });


        return descriptor;
    }
}

public class UseFluentValidationAttribute : ObjectFieldDescriptorAttribute
{
    protected override void OnConfigure(IDescriptorContext context,
        IObjectFieldDescriptor descriptor,
        MemberInfo member)
    {
        descriptor.UseFluentValidation();
    }
}