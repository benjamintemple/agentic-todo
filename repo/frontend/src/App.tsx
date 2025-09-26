import { Flex, Heading, View } from '@adobe/react-spectrum'
import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'

function App() {
  return (
    <View padding="size-400" maxWidth="800px" margin="0 auto">
      <Flex direction="column" gap="size-400">
        <Heading level={1}>Todo Realtime</Heading>
        <NewTaskForm />
        <TaskList />
      </Flex>
    </View>
  )
}

export default App