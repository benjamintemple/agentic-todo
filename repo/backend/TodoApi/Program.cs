using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.GraphQL;
using TodoApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseSqlite("Data Source=/data/todo.db"));

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddSubscriptionType<Subscription>()
    .AddType<TaskItemType>()
    .BindRuntimeType<int, IdType>()
    .ModifyOptions(options =>
    {
        options.StrictValidation = false;
    })
    .AddInMemorySubscriptions();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure pipeline
app.UseCors();
app.UseWebSockets();
app.MapGraphQL();

// Health check endpoint
app.MapGet("/healthz", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }));

// Ensure database is created and seed data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<TodoContext>();
    await context.Database.EnsureCreatedAsync();

    if (!await context.Tasks.AnyAsync())
    {
        context.Tasks.AddRange(
            new TaskItem { Title = "Welcome Task", Description = "This is your first task!", Status = TodoApi.Models.TaskStatus.Pending },
            new TaskItem { Title = "Sample Completed Task", Description = "This task is already done", Status = TodoApi.Models.TaskStatus.Completed }
        );
        await context.SaveChangesAsync();
    }
}

app.Run("http://0.0.0.0:8080");