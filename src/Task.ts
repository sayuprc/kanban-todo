export type Task = {
  id: string;
  content: string;
  removed: boolean;
};

export const getTasks = (key: string): Task[] => {
  const newTasks = localStorage.getItem(key);

  if (newTasks !== null) {
    return JSON.parse(newTasks);
  }
  return [];
};

export const saveTasks = (tasks: Task[], key: string): void => {
  localStorage.setItem(key, JSON.stringify(tasks));
};
