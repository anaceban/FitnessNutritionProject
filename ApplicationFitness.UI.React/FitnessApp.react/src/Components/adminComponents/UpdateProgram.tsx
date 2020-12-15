import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Container, makeStyles } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import CreateProgramSchedule from '../../services/interfaces/CreateProgramSchedule';
import programSchService from '../../services/programSchService';
import { paths } from '../../links/NavbarLinks';
import { useHistory } from 'react-router-dom';
import { updateProgramSchedule } from '../adminComponents/Shedules';


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
    await programSchService.updateProgram(data, updateProgramSchedule.id);
    history.push(paths.Programs);
  }
  const GoBack = () => {
    history.goBack();
  }
  return (
    <Container className={classes.root}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12} sm={12} md={12} className={classes.gridContent}>
          <h1>Update Program</h1>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              variant="outlined"
              inputRef={register}
              id="fitnessProgramName"
              name="fitnessProgramName"
              label="Fitness Name"
              fullWidth
              autoComplete="fitnessProgramName"
              defaultValue={updateProgramSchedule.fitnessProgramName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              variant="outlined"
              inputRef={register}
              id="fitnessProgramDescription"
              multiline
              name="fitnessProgramDescription"
              label="Fitness Description"
              fullWidth
              autoComplete="fitnessProgramDescription"
              defaultValue={updateProgramSchedule.fitnessProgramDescription}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              variant="outlined"
              inputRef={register}
              id="nutritionProgramName"
              multiline
              name="nutritionProgramName"
              label="Nutrition Name"
              fullWidth
              autoComplete="nutritionProgramName"
              defaultValue={updateProgramSchedule.nutritionProgramName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              variant="outlined"
              multiline
              inputRef={register}
              id="nutritionProgramDescription"
              name="nutritionProgramDescription"
              label="Nutrition Description"
              fullWidth
              autoComplete="nutritionProgramDescription"
              defaultValue={updateProgramSchedule.nutritionProgramDescription}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} className={classes.gridContent}>
            <Button variant="contained" style={{ backgroundColor: '#004752', color: 'white' }} type="submit" >
              Update Program
            </Button>
          </Grid>
        </Grid>
        <Box lineHeight={2} m={3}></Box>
        <Button onClick={GoBack} style={{ backgroundColor: '#004752', color: 'white' }}>Go Back</Button>
      </form>
    </Container>
  );
}