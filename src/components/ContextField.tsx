import React from 'react';
import { Grid } from '@material-ui/core';
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { Task, saveTasks } from '../Task';

type ListProps = 'new' | 'working' | 'done';

export type ContextFieldProps = {
  newTasks: Task[];
  workingTasks: Task[];
  doneTasks: Task[];
  setNewTasks: (tasks: Task[]) => void;
  setWorkingTasks: (tasks: Task[]) => void;
  setDoneTasks: (tasks: Task[]) => void;
};

const ContextField = ({
  newTasks,
  workingTasks,
  doneTasks,
  setNewTasks,
  setWorkingTasks,
  setDoneTasks,
}: ContextFieldProps): JSX.Element => {
  const taskList = {
    new: newTasks,
    working: workingTasks,
    done: doneTasks,
  };

  const stateList = {
    new: setNewTasks,
    working: setWorkingTasks,
    done: setDoneTasks,
  };

  const reorder = (
    tasks: Task[],
    startIndex: number,
    endIndex: number
  ): Task[] => {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (
    source: Task[],
    destination: Task[],
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const get = (id: ListProps) => {
    return {
      tasks: taskList[id],
      state: stateList[id],
    };
  };

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const { tasks, state } = get(source.droppableId as ListProps);
      const items = reorder(tasks, source.index, destination.index);
      state(items);
      saveTasks(items, source.droppableId);
    } else {
      const { tasks: sourceTasks, state: sourceState } = get(
        source.droppableId as ListProps
      );

      const { tasks: destTasks, state: destState } = get(
        destination.droppableId as ListProps
      );
      const result = move(sourceTasks, destTasks, source, destination);

      sourceState(result[source.droppableId]);
      destState(result[destination.droppableId]);
      saveTasks(result[source.droppableId], source.droppableId);
      saveTasks(result[destination.droppableId], destination.droppableId);
    }
  };

  return (
    <Grid container spacing={5} alignItems="stretch" justifyContent="center">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Grid item xs={4}>
          <TaskCard
            droppableId="new"
            setTasks={setNewTasks}
            tasks={taskList.new}
            cardTitle="新規"
          />
        </Grid>
        <Grid item xs={4}>
          <TaskCard
            droppableId="working"
            tasks={taskList.working}
            cardTitle="作業中"
            setTasks={setWorkingTasks}
          />
        </Grid>
        <Grid item xs={4}>
          <TaskCard
            droppableId="done"
            setTasks={setDoneTasks}
            tasks={taskList.done}
            cardTitle="完了"
          />
        </Grid>
      </DragDropContext>
    </Grid>
  );
};

export default ContextField;
