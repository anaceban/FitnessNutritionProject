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
import Dish from '../../services/interfaces/Dish';
import CreateIcon from '@material-ui/icons/Create';
import { ColDef } from '@material-ui/data-grid';
import ProgramDish from '../../services/interfaces/Dish';

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

const columns: ColDef[] = [
    { field: "Name", headerName: 'Name', width: 260 },
    { field: "TypeOfMeal", headerName: 'Type Of Meal', width: 260 },

];
export var updateItem: ProgramDish;
export default function BasicTable() {
    const classes = useStyles();
    const [dishes, setDishes] = useState([]);
    const [totalItemsCount, setItemsCount] = useState(0);
    const [filterModel, setFilterModel] = useState({ limit: 5, page: 0, term: "", sortedField:"Name", sortAsc: true } as FilterModel);

    const history = useHistory();
    useEffect(() => {
        fetchDishes(filterModel);
    }, [])

    const fetchDishes = async (filterModel: FilterModel) => {
        const response = await dishService.getAll(filterModel);
        console.log(response);
        if (response) {
            setFilterModel(filterModel);
            setItemsCount(response.totalItemsCount);
            setDishes(response.items);
        }
    }
    const handleSearch = async (searchTerm: string) => {
        const _filterModel = { ...filterModel };
        _filterModel.page = 0;
        _filterModel.term = searchTerm;
        console.log(_filterModel);
        await fetchDishes(_filterModel);
    }

    const handleChangePage = async (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        const _filterModel = { ...filterModel };
        console.log(newPage);
        _filterModel.page = newPage;
        await fetchDishes(_filterModel);
    };

    const handleChangeRowsPerPage = async (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const _filterModel = { ...filterModel };
        _filterModel.page = 1;
        _filterModel.limit = +event.target.value;
        await fetchDishes(_filterModel);
    };
    async function addDish() {
        history.push(paths.AddDish);
    }
    async function deleteDish(idDelete: number) {
        dishService.deleteDish(idDelete).then(() => setDishes(dishes.filter((dish: { id: number; }) => dish.id !== idDelete)));
    }
    async function updateDish(dish : ProgramDish) {
        updateItem = dish;
        history.push(paths.UpdateDish);
    }
    const handleSortColummClick = async (column:ColDef) =>{
        const _filterModel = { ...filterModel };
        _filterModel.sortedField = column.field;
        _filterModel.sortAsc = column.field !== filterModel.sortedField ? true : !filterModel.sortAsc;
        console.log(_filterModel);
        await fetchDishes(_filterModel);
    }

    return (
            <Paper className={classes.root} elevation={3}>
                <Typography>Program Dishes</Typography>
                <div className={classes.search}><Search OnSearch={handleSearch} />
                    <Button
                        color="inherit"
                        className={classes.button}
                        startIcon={<AddCircleIcon />}
                        onClick={addDish}
                    >
                        Add Dish
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
                                    <TableSortLabel active={filterModel.sortedField === column.field} direction={filterModel.sortAsc ? 'asc' : 'desc'}
                                    onClick={() => handleSortColummClick(column)} ></TableSortLabel>
                                </TableCell>
                        ))}
                        </TableHead>
                        <TableBody>
                            {(dishes).map(({ id, name, typeOfMeal }: ProgramDish) => (
                                <TableRow key={name}>
                                    <TableCell component="th" scope="row" className={classes.tableRow}>
                                        {name}
                                    </TableCell>
                                    <TableCell className={classes.tableRow}>{typeOfMeal}</TableCell>
                                    <Button
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<DeleteIcon />}
                                        onClick={() => deleteDish(id)}
                                    >
                                    </Button>
                                    <Button
                                        color="inherit"
                                        className={classes.button}
                                        startIcon={<CreateIcon />}
                                        onClick={() => updateDish({id, name, typeOfMeal})}
                                    >
                                    </Button>
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
