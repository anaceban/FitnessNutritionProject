import React, { useEffect, useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ColDef } from '@material-ui/data-grid';
import { getUserData } from '../services/scheduleService';
import UserData from '../services/interfaces/UserData';

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

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
}

const columns: ColDef[] = [
    { field: 'FirstName', headerName: 'First name', width: 75 },
    { field: 'LastName', headerName: 'Last name', width: 75 },
    {
        field: 'YearOfBirth',
        headerName: 'YearOfBirth',
        type: 'number',
        width: 75,
    },
    {
        field: 'Weight',
        headerName: 'Weight',
        type: 'number',
        width: 75,
    },
    {
        field: 'Height',
        headerName: 'Height',
        type: 'number',
        width: 75,
    },
    {
        field: 'NumberOfCaloriesPerDay',
        headerName: 'NumberOfCaloriesPerDay',
        type: 'number',
        width: 75,
    },

];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function CustomizedTables() {
    const classes = useStyles();
    const [userData, setUserData] = useState({} as UserData);
    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        const data = await getUserData();
        setUserData(data);
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <StyledTableCell
                                key={column.field}
                                align="left"
                                style={{ width: column.width }}
                            >
                                {column.headerName}
                            </StyledTableCell>

                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                        <StyledTableCell align="left" style={{color: 'white', fontFamily: 'Arial black'}}>
                            {userData.firstName}
                        </StyledTableCell>
                        <StyledTableCell align="left" style={{color: 'white', fontFamily: 'Arial black'}}>{userData.lastName}</StyledTableCell>
                        <StyledTableCell align="left" style={{color: 'white', fontFamily: 'Arial black'}}>{userData.yearOfBirth}</StyledTableCell>
                        <StyledTableCell align="left" style={{color: 'white', fontFamily: 'Arial black'}}>{userData.weight} KG</StyledTableCell>
                        <StyledTableCell align="left" style={{color: 'white', fontFamily: 'Arial black'}}>{userData.height} CM</StyledTableCell>
                        <StyledTableCell align="left" style={{color: 'white', fontFamily: 'Arial black'}}>{userData.numberOfCaloriesPerDay} KCAL</StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}