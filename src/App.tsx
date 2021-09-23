import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { Task } from './types/Type';
import TaskInput from './components/TaskInput';
import { getTasks } from './Task';
import ContextField from './components/ContextField';

const App = () => {
  const [content, setContent] = useState('');
  const [newTasks, setNewTasks] = useState<Task[]>(getTasks('new'));
  const [workingTasks, setWorkingTasks] = useState<Task[]>(getTasks('working'));
  const [doneTasks, setDoneTasks] = useState<Task[]>(getTasks('done'));

  return (
    <Container style={{ minWidth: '1000px' }}>
      <TaskInput
        tasks={newTasks}
        content={content}
        setContent={setContent}
        setTasks={setNewTasks}
      />
      <ContextField
        newTasks={newTasks}
        workingTasks={workingTasks}
        doneTasks={doneTasks}
        setNewTasks={setNewTasks}
        setWorkingTasks={setWorkingTasks}
        setDoneTasks={setDoneTasks}
      />
    </Container>
  );
};

export default App;
