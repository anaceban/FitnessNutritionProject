import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from 'react-router-dom';
import registerService from '../services/registerService';
import {RegisterUser} from '../services/interfaces/RegisterUser';
import { paths } from '../links/NavbarLinks';
import { toast } from 'react-toastify';
import UserContext from '../Context/UserContext';
import authService from '../services/authService';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
      FitnessNutrition App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: 'url(https://images.hdqwalls.com/download/girl-fitness-model-pic-1920x1080.jpg)'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundImage: 'url(https://images.hdqwalls.com/download/girl-fitness-model-pic-1920x1080.jpg)'
  },
  secondary: {
    light: '#ff7961',
    main: '#f44336',
    dark: '#ba000d',
    contrastText: '#000',
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const schema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
    passwordConfirm: yup.string().test('passwords-match', 'Passwords must match', function(value){

    return this.parent.password === value;  
    })
  });

  const history = useHistory();
  const { register, handleSubmit, errors} = useForm<RegisterUser>({ resolver: yupResolver(schema)});
  const userContext = useContext(UserContext);
  const onSubmit = async (data: RegisterUser) => {
    var result = await registerService.register(data);
    if(result.isSucces){
      userContext.onLogin(result);
      return history.push(paths.Profile);
    }
      
    else if (!result.isSucces) 
      toast.error('User with such email already exists')
      localStorage.clear();
  }
    
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                inputRef = {register}
                name="firstname"
                variant="outlined"
                fullWidth
                id="firstname"
                label="First Name"
                autoFocus
              />
            </Grid>
            {errors.firstname && <div>Is required</div>}
            <Grid item xs={12}>
              <TextField
                autoComplete="lname"
                inputRef = {register}
                name="lastname"
                variant="outlined"
                fullWidth
                id="lastname"
                label="Last Name"
                autoFocus
              />
            </Grid>
            {errors.lastname && <div>Is required</div>}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                inputRef = {register}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            {errors.email && <div>Wrong email</div>}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                inputRef = {register}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                inputRef = {register}
                fullWidth
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                autoComplete="current-password"
              />
            </Grid>
            {errors.passwordConfirm && <div>Passwords are not the same</div>}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href={paths.SignIn} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}