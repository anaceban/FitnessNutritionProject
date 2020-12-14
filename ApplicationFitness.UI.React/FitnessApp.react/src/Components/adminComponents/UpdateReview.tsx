import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button, Container, makeStyles } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { paths } from '../../links/NavbarLinks';
import { useHistory } from 'react-router-dom';
import UpdateReview from '../../services/interfaces/Review';
import { updateReview } from '../../services/reviewSevice';
import { updateReviewItem } from './AllReviews';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
  },
  gridContent: {
    textAlign: 'center',
  },
}));


export default function Update() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm<UpdateReview>({});
  const history = useHistory();
  const onSubmit = async (data: UpdateReview) => {
    await updateReview(updateReviewItem.id, data);
    history.push(paths.AllReviews);
  }
  return (
    <Container className={classes.root}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12} sm={12} md={12} className={classes.gridContent}>
          <h1>Update Comment</h1>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              inputRef={register}
              id="comment"
              name="comment"
              label="comment"
              fullWidth
              autoComplete="Name of Comment"
              defaultValue={updateReviewItem.comment}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} className={classes.gridContent}>
            <Button variant="contained" color="primary" type="submit" >
              Update Comment
      </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}