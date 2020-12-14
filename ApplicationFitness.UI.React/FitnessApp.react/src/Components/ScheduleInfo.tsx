import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Divider, Grid, Hidden, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProgramSchedule from '../services/interfaces/ProgramSchedule';
import programSchService from '../services/programSchService';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { useHistory, useParams } from 'react-router-dom';
import { getId } from './FitnessCard';
import { getReviews } from '../services/reviewSevice';
import { GetReview } from '../services/interfaces/Review';
import Rating from '@material-ui/lab/Rating';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ScheduleInfoSide from '../Components/ScheduleInfoSide';
import { number } from 'yup';

const useStyles = makeStyles((theme) => ({
    div: {
        marginTop: theme.spacing(10),
    },
    root: {
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        marginLeft: theme.spacing(5),
        fontFamily: 'Arial black',
        color: '#004752'
    },
    head: {
        color: 'white'
    },
    typog: {
        marginLeft: theme.spacing(5),
        color: '#004752'
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
}));


export default function TypeSchedule() {

    const classes = useStyles();
    const { id }:any = useParams();
    const [program, setProgram] = useState({} as ProgramSchedule);
    const [reviews, setReviews] = useState([] as GetReview[])
    
    const history = useHistory();
    useEffect(() => {
        fetchProgram();
    }, [])
    const fetchProgram = async () => {
        const data = await programSchService.getProgramByTypeId(id as Number);
        setProgram(data);
        const result = await getReviews(id as Number);
        setReviews(result);
        
    }

    return (

        <div className={classes.div}>
            <div>
                <Typography variant="h3" component="h3" style={{ color: 'black' }}>Fitness&Nutrition Program</Typography>
                <div style={{ display: 'flex', justifyContent: "center" }}>
                    <Grid item xs={10} md={8}>
                        <CardActionArea component="a" href="#">
                            <Hidden smDown>
                                <Card className={classes.card}>
                                    <CardMedia className={classes.cardMedia} image={'https://mfiles.alphacoders.com/730/730785.jpg'} title={"Fitness image"} />
                                    <div className={classes.cardDetails}>
                                        <CardContent>
                                            <Typography component="h2" variant="h5" style={{ color: 'white' }}>
                                                Level of fitness -{program.fitnessProgramName}
                                                <Typography variant="subtitle1" color="textSecondary" style={{ color: 'white' }}>
                                                    {program.fitnessProgramDescription}
                                                </Typography>
                                            </Typography>

                                        </CardContent>
                                    </div>
                                    <CardMedia className={classes.cardMedia} image={'https://papers.co/wallpaper/papers.co-mz21-food-style-eat-dish-41-iphone-wallpaper.jpg'} title={"Fitness image"} />
                                    <div className={classes.cardDetails}>
                                        <CardContent>
                                            <Typography component="h2" variant="h5" style={{ color: 'white' }}>Primary Goal -{program.nutritionProgramName}
                                                <Typography variant="subtitle1" color="textSecondary" style={{ color: 'white' }}> {program.nutritionProgramDescription}
                                                </Typography>
                                            </Typography>

                                        </CardContent>
                                    </div>

                                </Card>
                            </Hidden>
                        </CardActionArea>
                        <Hidden mdUp>
                            <ScheduleInfoSide></ScheduleInfoSide>
                        </Hidden>
                        <Typography style={{ color: 'black', fontSize: 24 }}>Reviews about program</Typography>
                        {reviews.map(({ firstName, lastName, comment, ratingMark }) => (
                            <Paper
                                style={{
                                    backgroundImage: 'url("https://cms-assets.tutsplus.com/uploads/users/412/posts/30733/image/12-fog-smoke.jpg")',
                                    color: 'white',
                                    justifyContent: 'left'
                                }} elevation={10}>
                                <Divider variant="middle" /><Divider variant="middle" /><Divider variant="middle" />
                                <Typography style={{ display: "flex", justifyContent: 'left', paddingLeft: 10 }}>
                                    <AccountCircleIcon htmlColor={"white"}></AccountCircleIcon> {firstName} {lastName}
                                </Typography >
                                <Typography style={{ display: "flex", justifyContent: 'left', paddingLeft: 10 }}>
                                    <Rating
                                        value={ratingMark}
                                        readOnly
                                    />
                                </Typography>
                                <Box margin={2}></Box>
                                <Divider variant="fullWidth" style={{ backgroundColor: "white" }} />
                                <Typography style={{ display: "flex", justifyContent: 'left', paddingLeft: 10 }}>
                                    {comment}
                                </Typography>
                                <Divider variant="middle" />
                            </Paper>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );
}