import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { Avatar, Box, Button, createStyles, FormHelperText, Grid, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { paths } from '../links/NavbarLinks';
import * as yup from "yup";
import CreatePage from '../services/interfaces/CreatePage';
import { yupResolver } from '@hookform/resolvers/yup';
import profilePageService from '../services/profilePageService';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Gender, PrimaryGoal, ExperienceLevel } from '../services/interfaces/CreatePage';
import { Controller } from "react-hook-form";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { getTypes } from '../services/typeService';
import ProgramType from '../services/interfaces/Type';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(20),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    form: {
      width: 360,
      margin: '0 auto',
      marginTop: 40,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 360,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundImage: 'url(https://images.hdqwalls.com/download/girl-fitness-model-pic-1920x1080.jpg)',
      color: 'white'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      backgroundImage: 'url(https://images.hdqwalls.com/download/girl-fitness-model-pic-1920x1080.jpg)'
    }
  }),
);

export default function CreateProfilePage() {
  const classes = useStyles();
  const [types, setTypes] = useState([] as ProgramType[]);
  const schema = yup.object().shape({
    yearOfBirth: yup.number().min(1930).max(2010).required(),
    weight: yup.number().min(15).max(200).required(),
    height: yup.number().min(100).max(210).required()
  })
  const history = useHistory();
  const { register, handleSubmit, errors, control } = useForm<CreatePage>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: CreatePage) => {
    await profilePageService.createPage(data);
    history.push(paths.UserProgramSchedule);
  }
  const GoBack = () => {
    history.goBack();
  }
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const programTypes = await getTypes();
    setTypes(programTypes);
  }
  return (
    <div className={classes.form}>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className={classes.root}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile Page
        </Typography>
        <Box lineHeight={2} m={1}></Box>
        <TextField
          variant="outlined"
          inputRef={register}
          fullWidth
          id="yearOfBirth"
          label="Year Of Birth"
          name="yearOfBirth"
          autoComplete="yearOfBirth"
        />
        {errors.yearOfBirth && <div>Wrong year</div>}
        <Box lineHeight={2} m={1}></Box>
        <TextField
          variant="outlined"
          inputRef={register}
          fullWidth
          id="weight"
          label="Weight (kg)"
          name="weight"
          autoComplete="weight"
        />
        {errors.weight && <div>Wrong weight</div>}
        <Box lineHeight={2} m={1}></Box>
        <TextField
          variant="outlined"
          inputRef={register}
          fullWidth
          id="height"
          label="Height (cm)"
          name="height"
          autoComplete="height"
        />
        {errors.height && <div>Wrong height</div>}
        <Box lineHeight={2} m={1}></Box>

        <InputLabel htmlFor="gender">Gender</InputLabel>
        <Controller
          as={
            <Select
              variant="filled"
              fullWidth
              id="gender"
              color={"secondary"}
              label="Gender"
              name="gender"
              autoComplete="gender"
              labelId="gender-select-label"

            >
              <MenuItem value={Gender.Female as string}> Female </MenuItem>
              <MenuItem value={Gender.Male as string}> Male </MenuItem>
            </Select>
          }
          name="gender"
          control={control}

        />

        {errors.gender && <div>Select Gender</div>}
        <Box lineHeight={2} m={1}></Box>
        <InputLabel htmlFor="typeName">Type</InputLabel>
        <Controller
          as={
            <Select
              variant="filled"
              fullWidth
              color={"secondary"}
              id="typeName"
              label="typeName"
              name="typeName"
              autoComplete="typeName"
            >

              {types.map(({name}) =>
                <MenuItem value={name}> {name} </MenuItem>
              )}
            </Select>
          }
          name="typeName"
          control={control}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submit}
        >
          Submit
          </Button>
        <Button onClick={GoBack}><ArrowBackIcon></ArrowBackIcon></Button>
      </form>
    </div>
  )
}
