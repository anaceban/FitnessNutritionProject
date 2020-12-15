import * as React from 'react';
import { ColDef } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import userAdminService from '../../services/userAdminService';
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
import { TableHead, Checkbox, TableSortLabel, Typography } from '@material-ui/core';
import User from '../../services/interfaces/User';


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
    { field: 'Id', headerName: 'ID', width: 70 },
    { field: 'FirstName', headerName: 'First name', width: 230 },
    { field: 'LastName', headerName: 'Last name', width: 230 },
    { field: 'Email', headerName: 'Email', width: 160 },
    {
        field: 'YearOfBirth',
        headerName: 'YearOfBirth',
        type: 'number',
        width: 160,
    },
    { field: 'isAdmin', headerName: 'Is Admin', width: 160, type:'Boolean' },

];


export default function DataTable() {
    const classes = useStyles();
    const [users, setUsers] = useState([]as User[]);
    const [totalItemsCount, setItemsCount] = useState(0);
    const [filterModel, setFilterModel] = useState({ limit: 5, page: 0, term: "", sortedField:"FirstName", sortAsc:true } as FilterModel);

    useEffect(() => {
        fetchUsers(filterModel);
    }, [])

    const fetchUsers = async (filterModel: FilterModel) => {

        const response = await userAdminService.getSorted(filterModel);
        if (response) {
            setFilterModel(filterModel);
            setItemsCount(response.totalItemsCount);
            setUsers(response.items);
        }
    }
    const handleSearch = async (searchTerm: string) => {
        const _filterModel = { ...filterModel };
        _filterModel.page = 0;
        _filterModel.term = searchTerm;
        await fetchUsers(_filterModel);
    }
    
    const handleChangePage = async (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        const _filterModel = { ...filterModel };
        _filterModel.page = newPage;
        await fetchUsers(_filterModel);
    };

    const handleChangeRowsPerPage = async (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const _filterModel = { ...filterModel };
        _filterModel.page = 1;
        _filterModel.limit = +event.target.value;
        await fetchUsers(_filterModel);
    };
    
    const handleUpdateStateChange = async (id: number, isAdmin:boolean) =>{
        const _users = [...users];
        const selectedUser = _users.find(u => u.id === id);
        if(selectedUser){
            selectedUser.isAdmin = isAdmin;
            await userAdminService.updateUserRole(selectedUser);
            setUsers(_users);
        }
    };
    const handleSortColummClick = async (column:ColDef) =>{
        const _filterModel = { ...filterModel };
        _filterModel.sortedField = column.field;
        _filterModel.sortAsc = column.field !== filterModel.sortedField ? true : !filterModel.sortAsc;
        await fetchUsers(_filterModel);
    }
    
    return (
        <Paper className={classes.root}>
            <Typography>Users</Typography>
            <div className={classes.search}><Search OnSearch={handleSearch} /></div>

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
                                    {column.field!='isAdmin' && <TableSortLabel active={filterModel.sortedField === column.field} direction={filterModel.sortAsc ? 'asc' : 'desc'}
                                    onClick={() => handleSortColummClick(column)} ></TableSortLabel>}
                                </TableCell>
                                
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(users).map(({ id, firstName, lastName, email, yearOfBirth, levelOfFitnessExperience, primaryGoal, isAdmin }) =>
                            <TableRow hover role="checkbox">
                                <TableCell component="th" scope="row">
                                    {id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {firstName}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {lastName}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {email}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {yearOfBirth}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Checkbox checked={isAdmin} onChange={(e) => handleUpdateStateChange(id, e.target.checked)}/>
                                </TableCell>
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
