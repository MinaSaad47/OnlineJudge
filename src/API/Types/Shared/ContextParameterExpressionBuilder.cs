using System.Linq.Expressions;
using System.Reflection;
using HotChocolate.Internal;
using HotChocolate.Resolvers;
using OnlineJudge.API.Application.Session;

namespace OnlineJudge.API.Types.Shared;

public class ContextParameterExpressionBuilder :
    CustomParameterExpressionBuilder<OnlineJudgeSession>,
    IParameterBindingFactory,
    IParameterBinding
{
    public ContextParameterExpressionBuilder() : base(ctx =>
        ctx.GetGlobalState<OnlineJudgeSession>(nameof(OnlineJudgeSession)))
    {
    }

    public ContextParameterExpressionBuilder(
        Expression<Func<IResolverContext, OnlineJudgeSession>> expression,
        Func<ParameterInfo, bool> canHandle) : base(expression, canHandle)
    {
    }

    public T Execute<T>(IResolverContext context)
    {
        return context.GetGlobalState<T>(nameof(OnlineJudgeSession));
    }

    public ArgumentKind Kind { get; } = ArgumentKind.Custom;
    public bool IsPure { get; } = true;

    public IParameterBinding Create(ParameterBindingContext context)
    {
        return this;
    }
}