using System.Reflection;
using FluentValidation;
using HotChocolate.Types.Descriptors;
using MassTransit;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnlineJudge.API.Application.Session;
using OnlineJudge.API.Domain.Entities;
using OnlineJudge.API.Infrastructure.Auth;
using OnlineJudge.API.Infrastructure.Persistence;
using OnlineJudge.API.Infrastructure.Persistence.Seeders;
using OnlineJudge.API.Types.Interceptors;
using OnlineJudge.API.Types.Shared;
using OnlineJudge.API.Types.Submissions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// identity
builder.Services
    .AddIdentityCore<User>()
    .AddRoles<IdentityRole<Guid>>()
    .AddUserManager<UserManager<User>>()
    .AddRoleManager<RoleManager<IdentityRole<Guid>>>()
    .AddEntityFrameworkStores<OnlineJudgeContext>()
    .AddDefaultTokenProviders();

// auth
builder.Services
    .Configure<AuthOptions>(
        builder.Configuration.GetSection(AuthOptions.SectionName))
    .AddOptionsWithValidateOnStart<AuthOptions>();
builder.Services
    .AddAuthentication()
    .AddJwtBearer();
builder.Services.AddAuthorization();
builder.Services.ConfigureOptions<ConfigureJwtBearerOptions>();
builder.Services
    .AddScoped<ITokenProvider, TokenProvider>();

// DbContext registration
builder.Services.AddDbContext<OnlineJudgeContext>(optionsBuilder =>
    optionsBuilder.UseNpgsql(
        builder.Configuration.GetConnectionString("OnlineJudgeContext")));

builder.Services.AddScoped<DefaultOnlineJudgeSession>();
builder.Services.AddScoped<IOnlineJudgeSession>(sp =>
    sp.GetRequiredService<DefaultOnlineJudgeSession>());


// fluent validation
builder.Services
    .AddValidatorsFromAssemblyContaining<Program>();

// metiatr
builder.Services.AddMediatR(configuration =>
{
    configuration.RegisterServicesFromAssemblyContaining<Program>();
});

// masstransit
builder.Services.AddMassTransit(cfg =>
{
    cfg.AddConsumers(Assembly.GetExecutingAssembly());

    cfg.UsingRabbitMq((ctx, config) => { config.ConfigureEndpoints(ctx); });
});


// GraphQL registration
builder.Services
    .AddSingleton<INamingConventions, CustomNamingConventions>();
builder.Services
    .AddGraphQLServer()
    // allow return exception
    .AddHttpRequestInterceptor<HttpRequestInterceptor>()
    .ModifyRequestOptions(options =>
    {
        options.IncludeExceptionDetails = true;
    })
    .RegisterDbContextFactory<OnlineJudgeContext>()
    .AddPagingArguments()
    .AddMutationConventions()
    .ModifyCostOptions(options => { options.EnforceCostLimits = false; })
    .AddInputParser(option => { option.IgnoreAdditionalInputFields = true; })
    .ModifyPagingOptions(options =>
    {
        options.RequirePagingBoundaries = false;
    })
    .AddAPITypes()
    .AddGlobalObjectIdentification()
    .AddAuthorization()
    .RegisterSubmissionsTypes()
    .InitializeOnStartup();

// seeders
builder.Services.AddScoped<DataSeeder>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapGraphQL();

app.MapGet("/api/hello", () => "Hello World!").RequireAuthorization();

app.MapWhen(context => !context.Request.Path.StartsWithSegments("/api") &&
                       !context.Request.Path.StartsWithSegments("/graphql"),
    appBuilder =>
    {
        if (app.Environment.IsDevelopment())
        {
            appBuilder.UseSpa(spaBuilder =>
            {
                spaBuilder.UseProxyToSpaDevelopmentServer(
                    "http://localhost:3000");
            });
        }
        else
        {
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
        }
    });

using var scope = app.Services.CreateScope();
var problemSeeder = scope.ServiceProvider.GetRequiredService<DataSeeder>();
await problemSeeder.SeedAsync();

app.Run();