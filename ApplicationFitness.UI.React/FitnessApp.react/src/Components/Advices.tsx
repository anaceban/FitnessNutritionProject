import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, Container, Grid, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ProgramAdvice from '../services/interfaces/ProgramAdvice';
import { getAdvices } from '../services/adviceService';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '80vh',
        backgroundColor: "white",
        marginTop: theme.spacing(8),
        backgroundImage: 'url("https://blog.gympass.com/wp-content/uploads/2018/03/ThinkstockPhotos-892146834-1.jpg")',
        backgroundSize: 'cover',
    },
    header: {
        color: 'rgb(57,117,120)',
        marginLeft: theme.spacing(10)
    },
    main: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2)
    },
    divCard: {
        display: 'flex',
        flexDirection: 'row'
    },
    card: {
        display: 'flex',
        justifyContent: "center",
        backgroundImage: 'url("https://cms-assets.tutsplus.com/uploads/users/412/posts/30733/image/12-fog-smoke.jpg")'
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
    footer: {
        marginTop: '15%',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

export default function Advices() {
    const classes = useStyles();
    const [advices, setAdvices] = useState([] as ProgramAdvice[])
    useEffect(() => {
        fetchAdvices();
    }, [])
    const fetchAdvices = async () => {
        const data = await getAdvices();
        setAdvices(data);
    }

    return (
        <div className={classes.root}>
            <div style={{ display: 'flex', justifyContent: "center" }}>
                <Grid item xs={12} md={6}>
                    <Typography variant={"h3"} style={{ color: "white", backgroundColor: "black" }}>Fitness&Nutrition Advices</Typography>
                    {advices.map(({ adviceForUser, adviceDesc }) => (
                        <CardActionArea component="a" href="#">
                            <Card className={classes.card} variant="outlined" >

                                <div className={classes.cardDetails}>
                                    <CardContent >
                                        <Typography component="h2" style={{ color: 'white' }}>
                                            <CheckCircleIcon htmlColor={"#50D050"}></CheckCircleIcon>{adviceForUser}
                                            <Typography variant="subtitle1" color="textSecondary" style={{ color: 'white' }}>
                                                {adviceDesc}
                                            </Typography>
                                        </Typography>

                                    </CardContent>
                                </div>

                            </Card>

                        </CardActionArea>
                    ))}
                </Grid>
            </div>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body1">Nutrition&Fitness Program {new Date().getFullYear()}</Typography>
                </Container>
            </footer>
        </div>
    );
}
