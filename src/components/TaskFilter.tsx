import { TextField } from '@material-ui/core';

type TaskFilterProps = {
  updateSearchText: (value: string) => void;
};

const TaskFilter = ({ updateSearchText }: TaskFilterProps): JSX.Element => {
  return (
    <TextField
      label="Search"
      id="outlined-basic"
      variant="outlined"
      fullWidth
      onChange={(event) => updateSearchText(event.target.value)}
    />
  );
};

export default TaskFilter;
