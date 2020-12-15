import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Hidden, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import ProgramSchedule from '../services/interfaces/ProgramSchedule';
import { getDishesForProgram, getProgram } from '../services/scheduleService';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { paths } from '../links/NavbarLinks';
import { useHistory } from 'react-router-dom';
import UserData from '../Components/UserData';
import SimpleAccordion from '../Components/ProgramDays';
import Dish from '../services/interfaces/Dish';
import AddReview from './/AddReviewDialog';
import { addReview } from '../services/reviewSevice';

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
        backgroundColor: '#004752'
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
}));

export var programId: number;
export default function UserProgramSchedule() {
    const classes = useStyles();
    const [program, setProgram] = useState({} as ProgramSchedule);
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    useEffect(() => {
        fetchProgram();
    }, [])
    async function changeProfilePage() {
        history.push(paths.Profile);
    }
    const fetchProgram = async () => {
        const data = await getProgram();
        programId = data.id;
        setProgram(data);
    }
    const onCancel = () => {
        setOpen(false);
    };

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
            <Box lineHeight={10} m={4}></Box>
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