import { useState, FormEvent } from 'react'
import { Button, Flex, Form, TextField } from '@adobe/react-spectrum'
import { useMutation } from 'react-relay'
import { graphql } from 'relay-runtime'

const CreateTaskMutation = graphql`
  mutation NewTaskFormCreateTaskMutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      status
      createdAt
    }
  }
`

export default function NewTaskForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [commitMutation, isMutationInFlight] = useMutation(CreateTaskMutation)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return

    commitMutation({
      variables: {
        input: { title: title.trim(), description: description.trim() }
      },
      updater: (store) => {
        // Get the new task from the mutation response
        const payload = store.getRootField('createTask')
        if (payload) {
          // Get the root query
          const root = store.getRoot()
          const allTasks = root.getLinkedRecords('allTasks') || []
          
          // Add the new task to the beginning of the list
          root.setLinkedRecords([payload, ...allTasks], 'allTasks')
        }
      },
      onCompleted: () => {
        setTitle('')
        setDescription('')
      },
      onError: (error) => {
        console.error('Error creating task:', error)
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Flex direction="column" gap="size-200">
        <TextField
          label="Title"
          value={title}
          onChange={setTitle}
          isRequired
        />
        <TextField
          label="Description"
          value={description}
          onChange={setDescription}
          isRequired
        />
        <Button
          type="submit"
          variant="cta"
          isDisabled={isMutationInFlight || !title.trim() || !description.trim()}
        >
          Add Task
        </Button>
      </Flex>
    </Form>
  )
}