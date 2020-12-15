import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Grid, Paper, TablePagination, TableSortLabel, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import dishService from '../../services/dishService';
import { paths } from '../../links/NavbarLinks';
import { useHistory } from 'react-router-dom';
import FilterModel from '../../services/interfaces/SearchFilterModel';
import Search from './Search';
import TablePaginationActions from './TablePagination';
import CreateIcon from '@material-ui/icons/Create';
import { getAll } from '../../services/programDayService';
import ProgramDish from '../../services/interfaces/Dish';
import { ColDef } from '@material-ui/data-grid';
import {deleteDay} from '../../services/programDayService'
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 200,
        maxWidth: 400,
        justifyContent: "center",
        margin: 0

    },
    tableContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(15)
    },
    tableRow: {
        marginLeft: theme.spacing(20)
    },
    button: {
        margin: theme.spacing(1),
    },
    search: {
        display: "flex"
    },
    root: {
        marginTop: theme.spacing(15),
        width: '100%'
    },
    container: {
        maxHeight: 440,
    }
}));
export interface Day {
    id: number,
    scheduleId: number,
    name: string,
    trainingLink: string,
    typeName: string,
    dishes: ProgramDish[]
}

const columns: ColDef[] = [
    { field: 'Id', headerName: 'ID', width: 160 },
    { field: 'TypeName', headerName: 'Type Name', width: 160 },
    { field: 'TrainingLink', headerName: 'Training Link', width: 160 },
    { field: 'Dishes', headerName: 'Dishes', width: 160 },
    { field: '', headerName: '', width: 260 },
];
export var updateId: number;
export default function BasicTable() {
    const classes = useStyles();
    const [days, setDays] = useState([]);
    const [totalItemsCount, setItemsCount] = useState(0);
    const [filterModel, setFilterModel] = useState({ limit: 5, page: 0, term: "", sortedField: 'TrainingLink', sortAsc: true } as FilterModel);

    const history = useHistory();
    useEffect(() => {
        fetchDays(filterModel);
    }, [])

    const fetchDays = async (filterModel: FilterModel) => {
        const response = await getAll(filterModel);
        if (response) {
            setFilterModel(filterModel);
            setItemsCount(response.totalItemsCount);
            setDays(response.items);
        }
    }
    const handleSearch = async (searchTerm: string) => {
        const _filterModel = { ...filterModel };
        _filterModel.page = 0;
        _filterModel.term = searchTerm;
        await fetchDays(_filterModel);
    }

    const handleChangePage = async (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        const _filterModel = { ...filterModel };
        _filterModel.page = newPage;
        await fetchDays(_filterModel);
    };

    const handleChangeRowsPerPage = async (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const _filterModel = { ...filterModel };
        _filterModel.page = 1;
        _filterModel.limit = +event.target.value;
        await fetchDays(_filterModel);
    };
    async function removeDay(idDelete: number) {
        deleteDay(idDelete).then(() => setDays(days.filter((program: { id: number; }) => program.id !== idDelete)));;
    }
    async function updateDay(id: number) {

    }
    async function addDay() {
        history.push(paths.AddNewDay);
    }
    const handleSortColummClick = async (column: ColDef) => {
        const _filterModel = { ...filterModel };
        _filterModel.sortedField = column.field;
        _filterModel.sortAsc = column.field !== filterModel.sortedField ? true : !filterModel.sortAsc;
        await fetchDays(_filterModel);
    }
    return (
        <Paper className={classes.root} elevation={3}>
            <Typography>Program Days</Typography>
            <div className={classes.search}><Search OnSearch={handleSearch} />
                <Button
                    color="inherit"
                    className={classes.button}
                    startIcon={<AddCircleIcon />}
                    onClick={addDay}
                >
                    Add Program Day
                    </Button>
            </div>

            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        {columns.map((column) => (
                            <TableCell
                                key={column.field}
                                align={column.align}
                                style={{ width: column.width }}
                            >
                                {column.headerName}
                                {column.field != 'TypeName' && column.field != 'Dishes' && <TableSortLabel active={filterModel.sortedField === column.field} direction={filterModel.sortAsc ? 'asc' : 'desc'}
                                    onClick={() => handleSortColummClick(column)} ></TableSortLabel>}

                            </TableCell>
                        ))}
                    </TableHead>
                    <TableBody>
                        {(days).map(({ id, typeName, trainingLink, dishes }) => (
                            <TableRow key={id}>
                                <TableCell component="th" scope="row" className={classes.tableRow}>
                                    {id}
                                </TableCell>
                                <TableCell className={classes.tableRow}>{typeName}</TableCell>
                                <TableCell className={classes.tableRow}>{trainingLink}</TableCell>
                                <TableCell className={classes.tableRow}>{(dishes as []).map(({ name }) => (
                                    <TableCell className={classes.tableRow}>{name}</TableCell>
                                ))}</TableCell>
                                <Button
                                    color="secondary"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => removeDay(id)}
                                ></Button>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                count={totalItemsCount}
                rowsPerPage={filterModel.limit}
                page={filterModel.page}
                SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </Paper>
    );
}
