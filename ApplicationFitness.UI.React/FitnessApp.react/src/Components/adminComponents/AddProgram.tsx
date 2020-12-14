import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button, Container, makeStyles } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import CreateProgramSchedule from '../../services/interfaces/CreateProgramSchedule';
import programSchService from '../../services/programSchService';
import { paths } from '../../links/NavbarLinks';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
  },
  gridContent: {
    textAlign: 'center',
  },
}));

export default function AddNewProgram() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm<CreateProgramSchedule>({});
  const history = useHistory();
  const onSubmit = async (data: CreateProgramSchedule) => {
    var result = await programSchService.createSchedule(data);
    console.log(data);
    if(result.isSucces)
        console.log("Successfully");
    history.push(paths.Programs);
  }
  return (
    <Container className={classes.root}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12} sm={12} md={12} className={classes.gridContent}>
          <h1>Add New Program</h1>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              required
              variant="outlined"
              inputRef={register}
              id="fitnessProgramName"
              name="fitnessProgramName"
              label="Fitness Name"
              fullWidth
              autoComplete="Fitness Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              inputRef={register}
              multiline
              id="fitnessProgramDescription"
              name="fitnessProgramDescription"
              label="Fitness Description"
              fullWidth
              autoComplete="Fitness Description"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              variant="outlined"
              inputRef={register}
              id="nutritionProgramName"
              name="nutritionProgramName"
              label="Nutrition Name"
              fullWidth
              autoComplete="Nutrition Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              inputRef={register}
              variant="outlined"
              multiline
              id="nutritionProgramDescription"
              name="nutritionProgramDescription"
              label="Nutrition Description"
              fullWidth
              autoComplete="Nutrition Description"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              variant="outlined"
              multiline
              inputRef={register}
              id="typeName"
              name="typeName"
              label="Type"
              fullWidth
              autoComplete="Type Name"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} className={classes.gridContent}>
            <Button variant="contained" type="submit" style={{ backgroundColor: '#004752', color: 'white' }} >
              Add Program
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}