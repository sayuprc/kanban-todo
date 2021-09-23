import React from 'react';

export type Task = {
  id: string;
  content: string;
  removed: boolean;
};

export type TaskListProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  saveTasks: (task: Task[]) => void;
};

export type TaskInputProps = {
  tasks: Task[];
  content: string;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  // saveTasks: (tasks: Task[]) => void;
};

export type TaskFilterProps = {
  tasks: Task[];
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  saveTasks: (tasks: Task[]) => void;
};
