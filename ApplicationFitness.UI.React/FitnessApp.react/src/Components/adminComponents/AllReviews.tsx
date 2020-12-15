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
import { useHistory } from 'react-router-dom';
import { paths } from '../../links/NavbarLinks';
import ReviewAdmin, { GetReview } from '../../services/interfaces/Review';
import { deleteReviewById, getReviewsFiltered } from '../../services/reviewSevice';

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
    { field: 'FirstName', headerName: 'FirstName', width: 260 },
    { field: 'LastName', headerName: 'LastName', width: 260 },
    { field: 'Comment', headerName: 'Comment', width: 260 },
    { field: 'ScheduleId', headerName: 'ScheduleId', width: 260 },
    { field: 'RatingMark', headerName: 'RatingMark', width: 260 },
    { field: '', headerName: '', width: 260 },
];
export interface Review {
    id: number,
    firstName: string,
    comment: string,
    lastName: string,
    scheduleId: string,
    ratingMark: number

}
export var updateReviewItem: Review;
export default function Reviews() {
    const classes = useStyles();
    const [reviews, setReviews] = useState([]);
    const [totalItemsCount, setItemsCount] = useState(0);
    const [filterModel, setFilterModel] = useState({ limit: 5, page: 0, term: "", sortedField: 'Comment', sortAsc: true } as FilterModel);
    const history = useHistory();
    useEffect(() => {
        fetchReviews(filterModel);
    }, [])

    const fetchReviews = async (filterModel: FilterModel) => {

        const response = await getReviewsFiltered(filterModel);
        if (response) {
            setFilterModel(filterModel);
            setItemsCount(response.totalItemsCount);
            setReviews(response.items);
        }
    }
    const handleSearch = async (searchTerm: string) => {
        const _filterModel = { ...filterModel };
        _filterModel.page = 0;
        _filterModel.term = searchTerm;
        await fetchReviews(_filterModel);
    }
    
    const handleChangePage = async (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        const _filterModel = { ...filterModel };
        _filterModel.page = newPage;
        await fetchReviews(_filterModel);
    };

    const handleChangeRowsPerPage = async (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const _filterModel = { ...filterModel };
        _filterModel.page = 1;
        _filterModel.limit = +event.target.value;
        await fetchReviews(_filterModel);
    };
    async function deleteReview(idDelete: number) {
        await deleteReviewById(idDelete).then(() => setReviews(reviews.filter((program: { id: number; }) => program.id !== idDelete)));;
    };
    async function updateReview(data: Review) {
        updateReviewItem = data;
        history.push(paths.UpdateReview);
    };
    const handleSortColummClick = async (column:ColDef) =>{
        const _filterModel = { ...filterModel };
        _filterModel.sortedField = column.field;
        _filterModel.sortAsc = column.field !== filterModel.sortedField ? true : !filterModel.sortAsc;
        await fetchReviews(_filterModel);
    }

    return (
        <Paper className={classes.root}>
             <Typography>Reviews about Program</Typography>
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
                                    {column.field!='FirstName' && column.field!='LastName' && <TableSortLabel active={filterModel.sortedField === column.field} direction={filterModel.sortAsc ? 'asc' : 'desc'}
                                    onClick={() => handleSortColummClick(column)} ></TableSortLabel>}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(reviews).map(({ id,firstName, lastName, scheduleId, comment, ratingMark }: Review) =>
                            <TableRow hover role="checkbox">
                                <TableCell component="th" scope="row">
                                    {firstName}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {lastName}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {comment}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {scheduleId}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {ratingMark}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Button
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => deleteReview(id)}
                                    >
                                    </Button>
                                    <Button
                                        color="inherit"
                                        startIcon={<CreateIcon />}
                                        onClick={() => updateReview({id, firstName, lastName, scheduleId, comment, ratingMark})}
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