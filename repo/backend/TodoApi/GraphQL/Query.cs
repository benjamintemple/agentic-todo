using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.GraphQL;

public class Query
{
    public async Task<List<TaskItem>> GetAllTasks([Service] TodoContext context)
    {
        return await context.Tasks.OrderByDescending(t => t.CreatedAt).ToListAsync();
    }
}