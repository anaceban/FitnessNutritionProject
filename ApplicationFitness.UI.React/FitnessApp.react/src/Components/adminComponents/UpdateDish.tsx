import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button, Container, makeStyles } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import Dish from '../../services/interfaces/Dish';
import dishService from '../../services/dishService';
import { paths } from '../../links/NavbarLinks';
import { useHistory } from 'react-router-dom';
import {updateItem} from '../../Components/adminComponents/Dish';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
  },
  gridContent: {
    textAlign: 'center',
  },
}));


export default function UpdateDish() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm<Dish>({});
  const history = useHistory();
  const onSubmit = async (data: Dish) => {
    await dishService.updateDish(data, updateItem.id);
    history.push(paths.Dishes);
  }
  return (
    <Container className={classes.root}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12} sm={12} md={12} className={classes.gridContent}>
          <h1>Update Dish</h1>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              inputRef={register}
              id="name"
              name="name"
              label="Name"
              fullWidth
              autoComplete="Name of Dish"
              defaultValue={updateItem.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              inputRef={register}
              id="typeOfMeal"
              name="typeOfMeal"
              label="Type of Meal"
              fullWidth
              autoComplete="Type of Meal"
              defaultValue={updateItem.typeOfMeal}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} className={classes.gridContent}>
            <Button variant="contained" color="primary" type="submit" >
              Update Dish
      </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}