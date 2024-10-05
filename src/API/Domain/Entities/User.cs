using Microsoft.AspNetCore.Identity;

namespace OnlineJudge.API.Domain.Entities;

public class User : IdentityUser<Guid>
{
    public List<Submission> Submissions { get; } = [];
}

public static partial class DomainExceptions
{
    public class RegistrationFailedException(List<string> errors)
        : Exception(errors.FirstOrDefault());

    public class InvalidCredentialsException()
        : Exception("Invalid credentials");

    public class UserNotFoundException : Exception
    {
        private UserNotFoundException(string message) : base(message)
        {
        }

        public static UserNotFoundException Email(string email)
        {
            return new UserNotFoundException(
                "User with email {email} not found");
        }


        public static UserNotFoundException Id(Guid id)
        {
            return new UserNotFoundException("User with Id {id} not found");
        }
    }

    public class ForbiddenAccessException : Exception
    {
        public ForbiddenAccessException() : base(
            "You don't have access to do this")
        {
        }
    }
}