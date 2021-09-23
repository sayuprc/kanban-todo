import { useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import TaskInput from './components/TaskInput';
import { Task, getTasks } from './Task';
import ContextField from './components/ContextField';
import TaskFilter from './components/TaskFilter';

const App = (): JSX.Element => {
  const [content, setContent] = useState('');
  const [newTasks, setNewTasks] = useState<Task[]>(getTasks('new'));
  const [workingTasks, setWorkingTasks] = useState<Task[]>(getTasks('working'));
  const [doneTasks, setDoneTasks] = useState<Task[]>(getTasks('done'));
  const [searchText, setSearchText] = useState('');

  const updateTasks =
    (key: string): ((tasks: Task[]) => void) =>
    (tasks: Task[]): void => {
      switch (key) {
        case 'new':
          setNewTasks(tasks);
          break;
        case 'working':
          setWorkingTasks(tasks);
          break;
        case 'done':
          setDoneTasks(tasks);
          break;

        default:
          break;
      }
    };
  const updateContent = (value: string): void => setContent(value);
  const updateSearchText = (value: string): void => setSearchText(value);

  const filterTasks = (tasks: Task[]): Task[] => {
    if (!searchText) return tasks;

    return tasks.filter(
      (task) =>
        ~task.content
          .toLocaleLowerCase()
          .indexOf(searchText.toLocaleLowerCase())
    );
  };

  return (
    <Container style={{ minWidth: '1000px' }}>
      <Grid
        container
        alignItems="center"
        justifyContent="flex-start"
        spacing={3}
      >
        <Grid item xs={4}>
          <TaskFilter updateSearchText={updateSearchText} />
        </Grid>
        <Grid item xs={6}>
          <TaskInput
            tasks={newTasks}
            content={content}
            setContent={updateContent}
            setTasks={setNewTasks}
          />
        </Grid>
      </Grid>
      <ContextField
        newTasks={filterTasks(newTasks)}
        workingTasks={filterTasks(workingTasks)}
        doneTasks={filterTasks(doneTasks)}
        setNewTasks={updateTasks('new')}
        setWorkingTasks={updateTasks('working')}
        setDoneTasks={updateTasks('done')}
      />
    </Container>
  );
};

export default App;
