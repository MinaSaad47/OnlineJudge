using System.Reflection;
using HotChocolate.Types.Descriptors;

namespace OnlineJudge.API.Types.Shared;

public class CustomNamingConventions : DefaultNamingConventions
{
    public override string GetArgumentName(ParameterInfo parameter)
    {
        if (!parameter.ParameterType.Name.EndsWith("Command"))
            return base.GetArgumentName(parameter);
        return "input";
    }


    public override string GetTypeName(Type type, TypeKind kind)
    {
        if (kind is TypeKind.InputObject)
            if (type.Name.EndsWith("Command"))
                return type.Name.Replace("Command", "Input");

        if (kind is TypeKind.Object)
            if (type.Name.EndsWith("Query"))
                return type.Name.Replace("Query", "Payload");
            else if (type.Name.EndsWith("Result"))
                return type.Name.Replace("Result", "Payload");

        return base.GetTypeName(type, kind);
    }
}