import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button, Container, makeStyles } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { paths } from '../../links/NavbarLinks';
import { useHistory } from 'react-router-dom';
import Type from '../../services/interfaces/ProgramType';
import {createType} from '../../services/typeService';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
  },
  gridContent: {
    textAlign: 'center',
  },
}));

export default function AddNewProgramType() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm<Type>({});
  const history = useHistory();
  const onSubmit = async (data: Type) => {
    var result = await createType(data);
    console.log(data);
    if(result.isSucces)
        console.log("Successfully");
    history.push(paths.Types);
  }
  return (
    <Container className={classes.root}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12} sm={12} md={12} className={classes.gridContent}>
          <h1>Add New ProgramType</h1>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              inputRef={register}
              id="name"
              name="name"
              label="name"
              fullWidth
              autoComplete="name"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} className={classes.gridContent}>
            <Button variant="contained" color="primary" type="submit" >
              Add ProgramType
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}