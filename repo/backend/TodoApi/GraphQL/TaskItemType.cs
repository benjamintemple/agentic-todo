using TodoApi.Models;

namespace TodoApi.GraphQL;

public class TaskItemType : ObjectType<TaskItem>
{
    protected override void Configure(IObjectTypeDescriptor<TaskItem> descriptor)
    {
        descriptor.Field(t => t.Id)
            .Type<NonNullType<IdType>>()
            .Resolve(context => context.Parent<TaskItem>().Id.ToString());
            
        descriptor.Field(t => t.Title);
        descriptor.Field(t => t.Description);
        descriptor.Field(t => t.Status);
        descriptor.Field(t => t.CreatedAt);
    }
}
