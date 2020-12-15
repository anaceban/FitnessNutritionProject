import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Container, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import Dish from '../../services/interfaces/Dish';
import dishService from '../../services/dishService';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { getDayIds } from '../../services/programDayService';
import { createDishDay } from '../../services/programDayService';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(8),
    },
    gridContent: {
        textAlign: 'center',
    },
}));

export interface DayDish {
    dishId: number,
    programDayId: number
}

export default function AddNewDish() {
    const classes = useStyles();
    const { register, handleSubmit, control } = useForm<DayDish>({});
    const [dayIds, setDayIds] = useState([]);
    const [dishes, setDishes] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const programDishes = await dishService.getDishes();
        setDishes(programDishes);
        const programDayIds = await getDayIds();
        setDayIds(programDayIds);
    }
    const history = useHistory();
    const GoBack = () => {
        history.goBack();
    }
    const onSubmit = async (data: DayDish) => {
        var result = await createDishDay(data);
        history.goBack();
    }
    return (
        <Container className={classes.root}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Grid item xs={12} sm={12} md={12} className={classes.gridContent}>
                    <h1>Add New Dish To Program Day</h1>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} style={{justifyContent: "center", display: "flex"}}>
                        <Grid item xs={2}>
                            <InputLabel htmlFor="dishId">Dish Id</InputLabel>
                            <Controller
                                as={
                                    <Select
                                        variant="filled"
                                        fullWidth
                                        color={"secondary"}
                                        id="dishId"
                                        label="Dish Id"
                                        name="dishId"
                                        autoComplete="dishId"
                                    >
                                        {dishes.map(({ id }) =>
                                            <MenuItem value={id}> {id} </MenuItem>
                                        )}
                                    </Select>
                                }
                                name="dishId"
                                control={control}
                            />

                        </Grid>
                        <Box lineHeight={2} m={3}></Box>
                        <Grid item xs={2}>
                            <InputLabel htmlFor="programDayId">Program Day Id</InputLabel>
                            <Controller
                                as={
                                    <Select
                                        variant="filled"
                                        fullWidth
                                        color={"secondary"}
                                        id="programDayId"
                                        label="Day Id"
                                        name="programDayId"
                                        autoComplete="programDayId"
                                    >
                                        {dayIds.map((id) =>
                                            <MenuItem value={id}> {id} </MenuItem>
                                        )}
                                    </Select>
                                }
                                name="programDayId"
                                control={control}
                            />

                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.gridContent}>
                        <Button variant="contained" color="primary" type="submit" style={{ backgroundColor: '#004752', color: 'white' }}>
                            Add Program Dish
      </Button>
                    </Grid>
                </Grid>
            </form>
            <Box lineHeight={2} m={3}></Box>
            <Button onClick={GoBack} style={{ backgroundColor: '#004752', color: 'white' }}>Go Back</Button>
        </Container>
    );
}