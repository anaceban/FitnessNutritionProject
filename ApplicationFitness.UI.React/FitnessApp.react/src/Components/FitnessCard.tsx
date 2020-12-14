import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { getTypes } from '../services/typeService';
import ProgramType from '../services/interfaces/Type';
import { useHistory } from 'react-router-dom';
import { paths } from '../links/NavbarLinks';
import { ButtonBase } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),

    },
    card: {
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '90%',
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    header: {
        color: 'white'
    }
}));


export var getId:number;
export default function Album() {
    const classes = useStyles();
    const history = useHistory();
    const [types, setTypes] = useState([] as ProgramType[]);
    useEffect(() => {
        fetchTypes();
    }, [])
    const fetchTypes = async () => {
        const data = await getTypes();
        setTypes(data);
    }
    async function getProgram(id:number) {
        history.push(`/typeProgram/${id}`);
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
            </AppBar>
            <main>
                <Container className={classes.cardGrid}>
                    {/* End hero unit */}
                    <h1 className={classes.header}>Program Types</h1>
                    <Grid container spacing={4}>

                        {types.map(({ id, name }) => (
                            <Grid item key={name} xs={12} sm={6} md={4}>
                                <ButtonBase onClick={() => getProgram(id)}>
                                <Card className={classes.card} style={{backgroundColor:'#004752'}} >
                                <CardMedia
                                    className={classes.cardMedia}
                                    image='https://www.health.harvard.edu/media/content/images/L1703_Healthy_TSk-512686460.jpg'
                                    title="Image title"
                                    
                                />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2" style={{color:"white"}}>
                                            Type 
                    </Typography>
                                        <Typography style={{color:"white"}}>
                                            {name}
                                        </Typography>
                                        
                                    </CardContent>
                                </Card>
                                </ButtonBase>
                            </Grid>
                        ))}

                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}