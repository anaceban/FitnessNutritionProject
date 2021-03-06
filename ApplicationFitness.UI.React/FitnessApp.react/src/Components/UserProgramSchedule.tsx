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
import UserProgramScheduleSide from '../Components/UserScheduleProgramSide';

const useStyles = makeStyles((theme) => ({
    div: {
        marginTop: theme.spacing(8),
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
    footer: {
        marginTop: '5%',
        backgroundColor: "#004752",
        color:"white"
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
        <div className={classes.div}>
            <div >
                <Typography variant="h3" component="h3" style={{ color: '#004752'}}>Fitness&Nutrition Program Schedule</Typography>
                <div style={{ display: 'flex', justifyContent: "center" }}>
                    <Grid item xs={12} md={6}>
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
                        
                            <UserProgramScheduleSide></UserProgramScheduleSide>
                        </Hidden>
                        <div> 
                        <Box lineHeight={10} m={4}></Box>
                            <UserData></UserData></div>
                            <Box lineHeight={10} m={4}></Box>
                        <SimpleAccordion></SimpleAccordion>
                    </Grid>
                </div>
            </div>
            <Box lineHeight={10} m={4}></Box>
            <Button variant="contained" style={{ backgroundColor: '#004752', color: 'white' }} onClick={changeProfilePage} size={"large"}>
                Change Profile Page
      </Button>
            <Button variant="contained" style={{ backgroundColor: 'white', color: '#004752' }} size={"large"} onClick={() => { setOpen(true) }}>
                Add Review
      </Button>
            <AddReview open={open} cancel={onCancel} onAdd={() => setOpen(false)}></AddReview>
            <Box lineHeight={10} m={4}></Box>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body1">Nutrition&Fitness  {new Date().getFullYear()}</Typography>
                </Container>
            </footer>
        </div>

    );
}