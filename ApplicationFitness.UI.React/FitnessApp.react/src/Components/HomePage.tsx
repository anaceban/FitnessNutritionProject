import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Album from './FitnessCard';
import BasicTable from './adminComponents/Dish';
import { Box, Card, CardContent, CardMedia } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '80vh',
        backgroundImage: 'url(https://resultsfitness.ie/wp-content/uploads/2018/11/Homepage-background-1.png)',
        backgroundSize: 'cover',
        marginTop: theme.spacing(6)
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
        justifyContent: "center"
    },
    footer: {
        marginTop: '5%',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
    typografy: {
        color: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
    gridList: {
        justifyContent: 'center'
    },
    div:{
        display: 'flex',
        flexDirection: 'row'
    },
}));

export default function HomePage() {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            <CssBaseline />
            
            <Container component="main" className={classes.main} maxWidth="sm">
                <Typography variant="h3" component="h4" className={classes.typografy}>
                    Eat&Fit
        </Typography>
                <Typography variant="h5" component="h2" gutterBottom className={classes.typografy}>
                    We teach you how to eat according to your goals through a macro-based, and also require mindset work via journaling along the way.
                    <Box m={2}></Box>
                    The training is meant for becoming a fitter, stronger, better version of ourselves-- not for standing around looking up random workouts.
                </Typography>
                <Album/>
            </Container>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body1">Nutrition&Fitness Program {new Date().getFullYear()}</Typography>
                </Container>
            </footer>
        </div>
    );
}