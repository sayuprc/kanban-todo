import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  TextField,
  Tooltip,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Task, saveTasks } from '../Task';
import '../css/TaskCard.css';

export type TaskCardProps = {
  droppableId: string;
  tasks: Task[];
  cardTitle: string;
  setTasks: (tasks: Task[]) => void;
};

const TaskCard = ({
  droppableId,
  tasks,
  cardTitle,
  setTasks,
}: TaskCardProps): JSX.Element => {
  const handleOnEdit = (id: string, value: string): void => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.content = value;
      }
      return task;
    });
    setTasks(newTasks);
    saveTasks(newTasks, droppableId);
  };

  const handleOnDelete = (id: string): void => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    saveTasks(newTasks, droppableId);
  };

  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <Card className="card">
          <CardHeader title={cardTitle} disableTypography className="card" />
          <CardContent className="card">
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <ListItem
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className="card-list"
                    >
                      <Tooltip title={task.content}>
                        <TextField
                          hiddenLabel
                          size="small"
                          value={task.content}
                          onChange={(event) =>
                            handleOnEdit(task.id, event.target.value)
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => handleOnDelete(task.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          </CardContent>
        </Card>
      )}
    </Droppable>
  );
};

export default TaskCard;
