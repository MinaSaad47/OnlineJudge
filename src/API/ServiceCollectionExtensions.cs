using System.Reflection;
using FluentValidation;
using HotChocolate.Internal;
using HotChocolate.Types.Descriptors;
using MassTransit;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Infrastructure.Auth;
using OnlineJudge.API.Infrastructure.Persistence;
using OnlineJudge.API.Infrastructure.Persistence.Seeders;
using OnlineJudge.API.Types.Interceptors;
using OnlineJudge.API.Types.Shared;
using OnlineJudge.API.Types.Shared.Interceptors;
using OnlineJudge.API.Types.Submissions;

namespace OnlineJudge.API;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddOnlineJudgeServices(
        this IServiceCollection services,
        IConfiguration cfg)
    {
        AddAuth(services, cfg);
        AddDatabase(services, cfg);
        AddGraphQL(services);
        AddValidation(services);
        AddMediatr(services);
        AddMessaging(services, cfg);
        services.AddCors();
        return services;
    }

    private static void AddAuth(IServiceCollection services, IConfiguration cfg)
    {
        services
            .AddIdentityCore<User>()
            .AddRoles<IdentityRole<Guid>>()
            .AddUserManager<UserManager<User>>()
            .AddRoleManager<RoleManager<IdentityRole<Guid>>>()
            .AddEntityFrameworkStores<OnlineJudgeContext>()
            .AddDefaultTokenProviders();

        services
            .Configure<AuthOptions>(cfg.GetSection(AuthOptions.SectionName))
            .AddOptionsWithValidateOnStart<AuthOptions>();
        services
            .AddAuthentication()
            .AddJwtBearer();
        services.AddAuthorization();
        services.ConfigureOptions<ConfigureJwtBearerOptions>();
        services
            .AddScoped<ITokenProvider, TokenProvider>();
    }

    private static void AddValidation(IServiceCollection services)
    {
        services
            .AddValidatorsFromAssemblyContaining<Program>();
    }

    private static void AddMediatr(IServiceCollection services)
    {
        services.AddMediatR(configuration =>
        {
            configuration.RegisterServicesFromAssemblyContaining<Program>();
        });
    }

    private static void AddMessaging(
        IServiceCollection services,
        IConfiguration cfg)
    {
        services.AddMassTransit(x =>
        {
            x.AddConsumers(Assembly.GetExecutingAssembly());

            x.UsingRabbitMq((ctx, config) =>
            {
                config.Host(cfg["Masstransit:RabbitMQ:Host"]);
                config.ConfigureEndpoints(ctx);
            });
        });
    }

    private static IServiceCollection AddDatabase(
        IServiceCollection services,
        IConfiguration cfg)
    {
        services.AddDbContext<OnlineJudgeContext>(optionsBuilder =>
            optionsBuilder.UseNpgsql(
                cfg.GetConnectionString("OnlineJudgeContext")));
        services.AddScoped<DataSeeder>();
        return services;
    }

    private static IServiceCollection AddGraphQL(IServiceCollection services)
    {
        services
            .AddSingleton<INamingConventions, CustomNamingConventions>()
            .AddSingleton<IParameterExpressionBuilder,
                ContextParameterExpressionBuilder>()
            .AddSingleton<IParameterBindingFactory,
                ContextParameterExpressionBuilder>();

        services
            .AddGraphQLServer()
            .AddHttpRequestInterceptor<HttpRequestInterceptor>()
            .AddSocketSessionInterceptor<WebSocketRequestInterceptor>()
            .ModifyRequestOptions(options =>
            {
                options.IncludeExceptionDetails = true;
            })
            .RegisterDbContextFactory<OnlineJudgeContext>()
            .AddPagingArguments()
            .AddMutationConventions()
            // .ModifyCostOptions(options => { options.EnforceCostLimits = false; })
            .AddInputParser(option =>
            {
                option.IgnoreAdditionalInputFields = true;
            })
            .ModifyPagingOptions(options =>
            {
                options.RequirePagingBoundaries = false;
            })
            .AddAPITypes()
            .AddGlobalObjectIdentification()
            .AddAuthorization()
            .RegisterSubmissionsTypes()
            .AddInMemorySubscriptions()
            .InitializeOnStartup();
        return services;
    }
}