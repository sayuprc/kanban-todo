import React from 'react';
import { IconButton, TextField, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Task, TaskInputProps } from '../types/Type';
import { saveTasks } from '../Task';
import '../css/TaskInput.css';

const TaskInput = ({
  tasks,
  content,
  setTasks,
  setContent,
}: TaskInputProps) => {
  const handleOnSubmit = (
    event: React.FormEvent<
      HTMLFormElement | HTMLInputElement | HTMLButtonElement
    >
  ): void => {
    event.preventDefault();

    if (!content) return;

    const newTask: Task = {
      id: new Date().getTime().toString(),
      content: content,
      removed: false,
    };

    const newTasks = [newTask, ...tasks];

    setTasks(newTasks);
    saveTasks(newTasks, 'new');

    setContent('');
  };

  return (
    <form className="input-form" onSubmit={(event) => handleOnSubmit(event)}>
      <TextField
        label="Task"
        size="small"
        variant="filled"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <Tooltip title="Add">
        <IconButton size="medium" onClick={(event) => handleOnSubmit(event)}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </form>
  );
};

export default TaskInput;
