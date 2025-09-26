using HotChocolate.Subscriptions;
using TodoApi.Models;

namespace TodoApi.GraphQL;

public class Subscription
{
    [SubscribeAndResolve]
    public IAsyncEnumerable<TaskItem> TaskChanged([Service] ITopicEventReceiver eventReceiver)
    {
        return eventReceiver.SubscribeAsync<TaskItem>(nameof(TaskChanged));
    }
}