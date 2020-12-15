import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Container, createStyles, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, TablePagination, TextField, Theme, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Control, Controller, useForm } from "react-hook-form";
import dishService from '../services/dishService';
import createDay from '../services/programDayService';
import ProgramDish from '../services/interfaces/Dish';
import programSchService from '../services/programSchService';
import { AddProgramDay } from '../services/interfaces/AddProgramDay';
import { useHistory } from 'react-router-dom';
import AddDishDialog from '../Components/adminComponents/AddDishToDay';
import ProgramDay from '../services/interfaces/ProgramDay';
import { paths } from '../links/NavbarLinks';
import { toast } from 'react-toastify';
import { getTypes } from '../services/typeService';
import ProgramType from '../services/interfaces/Type';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 400,
            maxWidth: 300,
            justifyContent: "center"
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
        root: {
            paddingTop: theme.spacing(8),
        },
        gridContent: {
            textAlign: 'center',
        },
        paper: {
            marginTop: theme.spacing(10),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    }),
);
export default function AddDay() {
    const classes = useStyles();
    const [dishes, setDishes] = useState([] as ProgramDish[]);
    const [dayDishes, setDayDishes] = React.useState<ProgramDish[]>([]);
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const [types, setTypes] = useState([] as ProgramType[]);
    const { register, handleSubmit, control } = useForm<AddProgramDay>({});
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const programDishes = await dishService.getDishes();
        setDishes(programDishes);
        var types = await getTypes();
        setTypes(types);
    }
    const onSubmit = async (day: AddProgramDay) => {
        day.dishes = dayDishes;
        console.log(day);
        await createDay(day);
        history.push(paths.Days);
    }
    const GoBack = () => {
        history.goBack();
    }
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDayDishes(event.target.value as ProgramDish[]);
    };
    return (
        <Container className={classes.root} component="main" maxWidth="xs">
            <div className={classes.paper}>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <h1>Add New Program Day</h1>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant={"outlined"}
                                required
                                inputRef={register}
                                id="dayName"
                                name="dayName"
                                label="Day Name"
                                fullWidth
                                autoComplete="Day Name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant={"outlined"}
                                required
                                inputRef={register}
                                id="trainingLink"
                                name="trainingLink"
                                label="Training Link"
                                fullWidth
                                autoComplete="Training Link"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="typeName">Type Name</InputLabel>
                                <Controller
                                    as={
                                        <Select
                                            variant="filled"
                                            fullWidth
                                            color={"secondary"}
                                            id="typeName"
                                            label="typeName"
                                            name="typeName"
                                            autoComplete="Type"
                                        >
                                            {types.map(({name}) =>
                                                <MenuItem value={name}> {name} </MenuItem>
                                            )}
                                        </Select>
                                    }
                                    name="typeName"
                                    control={control}

                                />
                            <Grid item xs={12}>
                                <InputLabel htmlFor="dishes">Dishes</InputLabel>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        value={dayDishes}
                                        variant="filled"
                                        fullWidth
                                        multiple
                                        color={"secondary"}
                                        id="dishes"
                                        label="dishes"
                                        name="dishes"
                                        autoComplete="dishes"
                                        onChange={handleChange}
                                    >
                                        {dishes.map(({ id, name, typeOfMeal }) =>
                                            <MenuItem value={id}>
                                                {typeOfMeal} : <Box marginLeft={1}></Box>
                                                {name} </MenuItem>
                                        )}
                                    </Select>
                                    </FormControl>

                            </Grid>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} className={classes.gridContent}>
                                <Box lineHeight={2} m={3}></Box>
                                <Button variant="contained" style={{ backgroundColor: '#004752', color: 'white' }} type="submit" >
                                    Add Program Day
      </Button>
                            </Grid>
                        </Grid>
                </form>
            </div>
                <Box lineHeight={2} m={3}></Box>
                <Button onClick={GoBack} style={{ backgroundColor: '#004752', color: 'white' }}>Go Back</Button>
        </Container >
    );
}

