import * as React from 'react';
import { ColDef } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import programSchService from '../../services/programSchService';
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
import CreateProgramSchedule from '../../services/interfaces/CreateProgramSchedule';
import ProgramSchedule from '../../services/interfaces/ProgramSchedule';
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
    { field: 'TypeName', headerName: 'Type', width: 160 },
    { field: 'FitnessProgramName', headerName: 'Fitness Name', width: 160 },
    { field: 'NutritionProgramName', headerName: 'Nutrition Name', width: 160 },
    { field: 'FitnessProgramDescription', headerName: 'Fitness Description', width: 160 },
    { field: 'NutritionProgramDescription', headerName: 'Nutrition Description', width: 160 },
    { field: 'modifications', headerName: ' ', width: 160 },
];
export var updateProgramSchedule: CreateProgramSchedule;
export var updateId: number;
export default function DataTable() {
    const classes = useStyles();
    const [programs, setPrograms] = useState([]);
    const [totalItemsCount, setItemsCount] = useState(0);
    const [filterModel, setFilterModel] = useState({ limit: 5, page: 0, term: "", sortedField: 'FitnessProgramName', sortAsc: true } as FilterModel);
    const history = useHistory();
    useEffect(() => {
        fetchPrograms(filterModel);
    }, [])

    const fetchPrograms = async (filterModel: FilterModel) => {

        const response = await programSchService.getSorted(filterModel);
        if (response) {
            setFilterModel(filterModel);
            setItemsCount(response.totalItemsCount);
            setPrograms(response.items);
        }
    }
    const handleSearch = async (searchTerm: string) => {
        const _filterModel = { ...filterModel };
        _filterModel.page = 0;
        _filterModel.term = searchTerm;
        console.log(_filterModel);
        await fetchPrograms(_filterModel);
    }
    
    const handleChangePage = async (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        const _filterModel = { ...filterModel };
        console.log(newPage);
        _filterModel.page = newPage;
        await fetchPrograms(_filterModel);
    };

    const handleChangeRowsPerPage = async (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const _filterModel = { ...filterModel };
        _filterModel.page = 1;
        _filterModel.limit = +event.target.value;
        await fetchPrograms(_filterModel);
    };
    async function addProgram() {
        history.push(paths.AddProgram);
    };
    async function deleteProgram(idDelete: number) {
        programSchService.deleteProgram(idDelete).then(() => setPrograms(programs.filter((program: { id: number; }) => program.id !== idDelete)));
    };
    async function updateProgram(program: CreateProgramSchedule) {
        console.log(program);
        updateProgramSchedule = program;
        history.push(paths.UpdateProgram);
    };
    const handleSortColummClick = async (column:ColDef) =>{
        const _filterModel = { ...filterModel };
        _filterModel.sortedField = column.field;
        _filterModel.sortAsc = column.field !== filterModel.sortedField ? true : !filterModel.sortAsc;
        console.log(_filterModel);
        await fetchPrograms(_filterModel);
    }

    return (
        <Paper className={classes.root}>
             <Typography>Schedules</Typography>
            <div className={classes.search}><Search OnSearch={handleSearch} />             
            <Button
                startIcon={<AddCircleIcon />}
                onClick={addProgram}
            >
                </Button>
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
                                    {column.field!='TypeName' && <TableSortLabel active={filterModel.sortedField === column.field} direction={filterModel.sortAsc ? 'asc' : 'desc'}
                                    onClick={() => handleSortColummClick(column)} ></TableSortLabel>}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(programs).map(({ id,typeName, fitnessProgramName, nutritionProgramName, fitnessProgramDescription, nutritionProgramDescription }:CreateProgramSchedule) =>
                            <TableRow hover role="checkbox">
                                <TableCell component="th" scope="row">
                                    {id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {typeName}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {fitnessProgramName}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {nutritionProgramName}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {fitnessProgramDescription}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {nutritionProgramDescription}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                <Button
                                    color="secondary"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => deleteProgram(id)}
                                >
                            </Button>
                                <Button
                                    color="inherit"
                                    startIcon={<CreateIcon />}
                                    onClick={() => updateProgram({id, typeName, fitnessProgramName, nutritionProgramName, fitnessProgramDescription, nutritionProgramDescription})}
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