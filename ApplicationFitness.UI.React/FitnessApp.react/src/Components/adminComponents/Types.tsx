import * as React from 'react';
import { ColDef } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import Search from '../adminComponents/Search';
import FilterModel from '../../services/interfaces/SearchFilterModel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePaginationActions from '../adminComponents/TablePagination';
import { Button, TableHead, TableSortLabel, Typography } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useHistory } from 'react-router-dom';
import { paths } from '../../links/NavbarLinks';
import {deleteType, getTypesFiltered} from '../../services/typeService';
import Type from '../../services/interfaces/Type';
import ProgramType from '../../services/interfaces/Type';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(15),
        width: '100%'
    },
    search: {
        display: "flex"
    },
    table: {
        minWidth: 500,
    },
    container: {
        maxHeight: 440,
    },
}));

const columns: ColDef[] = [
    { field: 'Id', headerName: 'ID', width: 260 },
    { field: 'Name', headerName: 'Name', width: 260 },
];
export var updateTypeItem: ProgramType;
export default function DataTable() {
    const classes = useStyles();
    const [types, setTypes] = useState([]);
    const [totalItemsCount, setItemsCount] = useState(0);
    const [filterModel, setFilterModel] = useState({ limit: 5, page: 0, term: "", sortedField:'Name', sortAsc:true } as FilterModel);
    const history = useHistory();
    useEffect(() => {
        fetchTypes(filterModel);
    }, [])

    const fetchTypes = async (filterModel: FilterModel) => {

        const response = await getTypesFiltered(filterModel);
        if (response) {
            setFilterModel(filterModel);
            setItemsCount(response.totalItemsCount);
            setTypes(response.items);
        }
    }
    const handleSearch = async (searchTerm: string) => {
        const _filterModel = { ...filterModel };
        _filterModel.page = 0;
        _filterModel.term = searchTerm;
        console.log(_filterModel);
        await fetchTypes(_filterModel);
    }
    
    const handleChangePage = async (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        const _filterModel = { ...filterModel };
        console.log(newPage);
        _filterModel.page = newPage;
        await fetchTypes(_filterModel);
    };

    const handleChangeRowsPerPage = async (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const _filterModel = { ...filterModel };
        _filterModel.page = 1;
        _filterModel.limit = +event.target.value;
        await fetchTypes(_filterModel);
    };
    async function updateProgramType(type: Type) {
        updateTypeItem = type;
        history.push(paths.UpdateType);
    };
    const handleSortColummClick = async (column:ColDef) =>{
        const _filterModel = { ...filterModel };
        _filterModel.sortedField = column.field;
        _filterModel.sortAsc = column.field !== filterModel.sortedField ? true : !filterModel.sortAsc;
        console.log(_filterModel);
        await fetchTypes(_filterModel);
    }

    return (
        <Paper className={classes.root}>
            <Typography>Program Types</Typography>
            <div className={classes.search}><Search OnSearch={handleSearch} />             
                </div>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow >
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(types).map(({ id, name }:ProgramType) =>
                            <TableRow hover role="checkbox">
                                <TableCell component="th" scope="row">
                                    {id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                <Button
                                    color="inherit"
                                    startIcon={<CreateIcon />}
                                    onClick={() => updateProgramType({id, name})}
                                >
                            </Button></TableCell>
                            </TableRow>

                        )}

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