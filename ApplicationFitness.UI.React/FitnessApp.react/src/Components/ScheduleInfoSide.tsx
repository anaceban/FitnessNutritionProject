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
    const [program, setProgram] = useState({} as ProgramSchedule);
    const [reviews, setReviews] = useState([] as GetReview[])
    const { id }:any = useParams();
    const history = useHistory();
    useEffect(() => {
        fetchProgram();
    }, [])
    const fetchProgram = async () => {
        const data = await programSchService.getProgramByTypeId(id);
        setProgram(data);
        const result = await getReviews(id);
        setReviews(result);
    }

    return (
        <Card>
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
            </Card>
            <Card className={classes.card}>
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
        </Card>
    );
}