import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProgramDay from '../services/interfaces/ProgramDay';
import { getDishesForProgram, getProgramDays } from '../services/scheduleService';
import { Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';
import ReactPlayer from 'react-player';
import ProgramDish from '../services/interfaces/ProgramDish';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
            fontFamily: 'Arial black',
            color: '#004752'
        },
    }),
);
const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: 'white',
            color: '#004752',
            fontFamily: 'Arial black'
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: '#004752',
        },
    }),
)(TableRow);
export default function SimpleAccordion() {
    const classes = useStyles();
    const [programDishes, setDishes] = useState([] as ProgramDish[]);
    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        const programDishes = await getDishesForProgram();
        setDishes(programDishes);
    }

    return (
        <div className={classes.root}>
            {programDishes && programDishes.map(({ trainingLink, dishes }) =>
                <Accordion style={{ alignItems: "center", justifyContent: "center" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading} >Program Day</Typography>

                    </AccordionSummary>
                    <AccordionDetails style={{ alignItems: "center", justifyContent: "center" }}>
                        <Typography>
                            {trainingLink && <ReactPlayer url={trainingLink}></ReactPlayer>}

                        </Typography>
                    </AccordionDetails>
                    <AccordionDetails style={{ alignItems: "center", justifyContent: "center" }}>
                         <Typography>{dishes.map(({ name, typeOfMeal }) =>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>{typeOfMeal}</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <StyledTableRow>
                                            <StyledTableCell align="left" style={{ color: 'white', fontFamily: 'Arial black' }}>{name}</StyledTableCell>
                                        </StyledTableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}

                        </Typography>
                    </AccordionDetails>
                </Accordion>

            )}
        </div>
    );
}