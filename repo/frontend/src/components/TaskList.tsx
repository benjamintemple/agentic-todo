import {
  View,
  Flex,
  Text,
  Button,
  ListView,
  Item,
  Badge
} from '@adobe/react-spectrum'
import { useLazyLoadQuery, useMutation, useSubscription } from 'react-relay'
import { graphql } from 'relay-runtime'

const TaskListQuery = graphql`
  query TaskListQuery {
    allTasks {
      id
      title
      description
      status
      createdAt
    }
  }
`

const UpdateTaskStatusMutation = graphql`
  mutation TaskListUpdateTaskStatusMutation($input: UpdateTaskStatusInput!) {
    updateTaskStatus(input: $input) {
      id
      status
    }
  }
`

const TaskChangedSubscription = graphql`
  subscription TaskListTaskChangedSubscription {
    taskChanged {
      id
      title
      description
      status
      createdAt
    }
  }
`

export default function TaskList() {
  const data = useLazyLoadQuery(TaskListQuery, {})
  const [commitMutation] = useMutation(UpdateTaskStatusMutation)

  useSubscription({
    subscription: TaskChangedSubscription,
    variables: {},
    onNext: (response: any) => {
      console.log('Task changed:', response.taskChanged)
    }
  })

  const toggleTaskStatus = (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'PENDING' ? 'COMPLETED' : 'PENDING'

    commitMutation({
      variables: {
        input: { id: parseInt(taskId), status: newStatus }
      },
      optimisticUpdater: (store) => {
        // Optimistically update the UI immediately
        const taskRecord = store.get(taskId)
        if (taskRecord) {
          taskRecord.setValue(newStatus, 'status')
        }
      },
      onError: (error) => {
        console.error('Error updating task:', error)
      }
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <View>
      <Text slot="label">Tasks ({(data as any).allTasks.length})</Text>
      <ListView
        items={(data as any).allTasks}
        selectionMode="none"
        height="400px"
        aria-label="Tasks list"
      >
        {(item: any) => (
          <Item key={item.id} textValue={item.title}>
            <Flex direction="column" gap="size-100">
              <Flex justifyContent="space-between" alignItems="center">
                <Text>{item.title}</Text>
                <Flex gap="size-100" alignItems="center">
                  <Badge variant={item.status === 'COMPLETED' ? 'positive' : 'neutral'}>
                    {item.status}
                  </Badge>
                  <Button
                    variant="secondary"
                    onPress={() => toggleTaskStatus(item.id, item.status)}
                  >
                    {item.status === 'PENDING' ? 'Complete' : 'Reopen'}
                  </Button>
                </Flex>
              </Flex>
              <Text>{item.description}</Text>
              <Text slot="description">Created: {formatDate(item.createdAt)}</Text>
            </Flex>
          </Item>
        )}
      </ListView>
    </View>
  )
}