using System.Reflection;
using MassTransit;
using OnlineJudge.Executor;
using OnlineJudge.Executor.Isolate;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.Configure<IsolateOptions>(
    builder.Configuration.GetSection(IsolateOptions.SectionName));

builder.Services.AddSingleton<RotatingNumberProvider>();
builder.Services.AddSingleton<CodeExecutor>();

builder.Services.AddMassTransit(x =>
{
    x.AddConsumers(Assembly.GetExecutingAssembly());

    x.UsingRabbitMq((context, cfg) => cfg.ConfigureEndpoints(context));
});

var host = builder.Build();
host.Run();