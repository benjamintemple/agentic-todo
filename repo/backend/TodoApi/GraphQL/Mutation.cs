using HotChocolate.Subscriptions;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.GraphQL;

public class Mutation
{
    public async Task<TaskItem> CreateTask(
        CreateTaskInput input,
        [Service] TodoContext context,
        [Service] ITopicEventSender eventSender)
    {
        var task = new TaskItem
        {
            Title = input.Title,
            Description = input.Description,
            Status = Models.TaskStatus.Pending,
            CreatedAt = DateTime.UtcNow
        };

        context.Tasks.Add(task);
        await context.SaveChangesAsync();

        await eventSender.SendAsync("TaskChanged", task);

        return task;
    }

    public async Task<TaskItem> UpdateTaskStatus(
        UpdateTaskStatusInput input,
        [Service] TodoContext context,
        [Service] ITopicEventSender eventSender)
    {
        var task = await context.Tasks.FindAsync(input.Id);
        if (task == null)
            throw new GraphQLException("Task not found");

        task.Status = input.Status;
        await context.SaveChangesAsync();

        await eventSender.SendAsync("TaskChanged", task);

        return task;
    }
}

public record CreateTaskInput(string Title, string Description);
public record UpdateTaskStatusInput(int Id, Models.TaskStatus Status);