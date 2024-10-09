using OnlineJudge.API;
using OnlineJudge.API.Infrastructure.Persistence.Seeders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddOnlineJudgeServices(builder.Configuration);

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

app.UseWebSockets();

app.MapGraphQL();

app.UseCors(cfg => { cfg.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin(); });

app.MapWhen(context => !context.Request.Path.StartsWithSegments("/api") &&
                       !context.Request.Path.StartsWithSegments("/graphql"),
    appBuilder =>
    {
        // if (app.Environment.IsDevelopment())
        //     appBuilder.UseSpa(spaBuilder =>
        //     {
        //         spaBuilder.UseProxyToSpaDevelopmentServer(
        //             "http://localhost:3000");
        //     });
        // else
        app.UseStaticFiles();
        // app.UseSpaStaticFiles();
    });

using var scope = app.Services.CreateScope();
var problemSeeder = scope.ServiceProvider.GetRequiredService<DataSeeder>();
await problemSeeder.SeedAsync();

app.Run();