import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button, Container, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import Dish from '../../services/interfaces/Dish';
import dishService from '../../services/dishService';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
  },
  gridContent: {
    textAlign: 'center',
  },
}));

export default function AddNewDish() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm<Dish>({});
  const history = useHistory();
  const GoBack = () => {
    history.goBack();
  }
  const onSubmit = async (data: Dish) => {
    var result = await dishService.createDish(data);
    if (result.isSucces)
      console.log("Successfully");
    history.goBack();
  }
  return (
    <Container className={classes.root}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12} sm={12} md={12} className={classes.gridContent}>
          <h1>Add New Program Dish</h1>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid item xs={12}>
            <TextField
              required
              inputRef={register}
              id="name"
              name="name"
              label="Name"
              fullWidth
              autoComplete="Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              inputRef={register}
              id="typeOfMeal"
              name="typeOfMeal"
              label="Type Of Meal"
              fullWidth
              autoComplete="Type Of Meal"
            />
          </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} className={classes.gridContent}>
            <Button variant="contained" color="primary" type="submit" >
              Add Program Dish
      </Button>
          </Grid>
        </Grid>
      </form>
      <Button onClick={GoBack}><ArrowBackIcon></ArrowBackIcon></Button>
    </Container>
  );
}