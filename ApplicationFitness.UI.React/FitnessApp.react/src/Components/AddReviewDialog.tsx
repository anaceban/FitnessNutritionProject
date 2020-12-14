import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useForm } from 'react-hook-form';
import Review from '../services/interfaces/Review';
import { programId } from '../Components/UserProgramSchedule';
import { addReview } from '../services/reviewSevice';
import { useHistory } from 'react-router-dom';
import { paths } from '../links/NavbarLinks';
import { Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
export interface Props {
  open: boolean,
  cancel: () => void,
  onAdd: () => void
}

export default function AddReview(props: Props) {
  const { open, cancel, onAdd } = props;
  const [value, setValue] = React.useState<number>(0);
  const { register, handleSubmit } = useForm<Review>({});
  const history = useHistory();
  const onSubmit = async (data: Review) => {
    data.scheduleId = programId;
    data.ratingMark = value as number;
    await addReview(data);
    onAdd();
    history.replace(paths.UserProgramSchedule);
  }
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={cancel}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="form-dialog-title">Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Leave review about this program
          </DialogContentText>
            <Typography component="legend">Mark</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue as number)
              }}
            />
          <TextField
            variant="outlined"
            label="Comment"
            multiline
            autoFocus
            id="comment"
            type="comment"
            name="comment"
            fullWidth
            inputRef={register}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}