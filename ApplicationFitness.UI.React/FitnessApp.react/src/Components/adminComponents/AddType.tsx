import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Container, makeStyles } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { paths } from '../../links/NavbarLinks';
import { useHistory } from 'react-router-dom';
import Type from '../../services/interfaces/ProgramType';
import { createType } from '../../services/typeService';

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
    await createType(data);
    history.push(paths.Types);
  }
  const GoBack = () => {
    history.goBack();
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
            <Box lineHeight={2} m={3}></Box>
            <Button onClick={GoBack} style={{ backgroundColor: '#004752', color: 'white' }}>Go Back</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}