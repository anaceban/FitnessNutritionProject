import React, { useContext } from 'react';
import { ArrowRight, Home } from "@material-ui/icons";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, List, Typography, IconButton, Hidden, ListItem, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box } from '@material-ui/core/';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from "react-router-dom";
import { links, paths, linksProfile, adminLinks } from '../links/NavbarLinks';
import SideBar from './SideBar';
import authService from '../services/authService';
import UserContext from '../Context/UserContext';
import SignOut from '../Components/SignOut';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: 'rgb(2,0,36)', 
        background: 'linear-gradient(90deg, rgba(57,117,120,1) 0%, rgba(0,0,0,0.7287289915966386) 40%, rgba(0,78,74,1) 100%)'
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: 'none',
    },
    drawer: {
        flexShrink: 0,
        
    },
    navDisplayFlex: {
        display: "flex",
        justifyContent: "space-around"
        
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `primary`,
        display: "flex"
    },
    button: {
        color: 'white',
        margin: theme.spacing(0, 4, 0),
        
    },
    linkhover: {
        color: 'white',
    },
    homeButton:{
        color: 'white',
    },
    submit: {
        marginTop: theme.spacing(0),
        margin: theme.spacing(2, 0, 1),
        backgroundColor: '#00796b',
        color: "white",

    },
    listItem:{
        display: "flex",
        justifyContent: "center"
    }
}));

export default function PersistentDrawerLeft() {
    const [open, setOpen] = React.useState(false);
    
    const classes = useStyles();
    const userContext = useContext(UserContext);
    
    const history = useHistory();
    const onSingout = async () => {
        await authService.logOut();
        userContext.onLogOut();
        history.replace(paths.HomePage);
        setOpen(false);
    };
    const onCancel = () => {

        setOpen(false);
    };
    console.log(userContext.user);
    return (
        <div>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar)}
            >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        className={clsx(classes.menuButton)}
                    >
                        <Link href={paths.HomePage} className={classes.homeButton}><Home fontSize="large" color='action' /></Link>
                    </IconButton>
                    <Hidden smDown>
                        <List
                            component="nav"
                            aria-labelledby="main navigation"
                            className={classes.navDisplayFlex}
                        >   {userContext.user.token && !userContext.user.isAdmin && linksProfile.map(({ title, path }) => (
                            <ListItem button key={title}>
                                <Link variant="body2" href={path} className={classes.linkhover}><ListItemText primary={title} /></Link>
                            </ListItem>
                        ))
                            }

                            {!userContext.user.isSucces && links.map(({ title, path }) => (
                                <ListItem button key={title}>
                                    <Link variant="body2" href={path} className={classes.linkhover}><ListItemText primary={title} /></Link>
                                </ListItem>
                                
                            ))}
                            {(userContext.user.isAdmin && userContext.user.token) && adminLinks.map(({ title, path }) => (
                                <ListItem button key={title}>
                                    <Link variant="body2" href={path} className={classes.linkhover}><ListItemText primary={title} /></Link>
                                </ListItem>

                            ))}
                            {userContext.user.token && <Button onClick={() =>{setOpen(true)}} className={classes.button}>
                                SignOut
                                </Button> }
                        </List>
                    </Hidden>
                </Toolbar>
                
                <Hidden mdUp>
                    <SideBar />
                </Hidden>
                <SignOut open={open} logout={onSingout} cancel={onCancel}/>
            </AppBar>
        </div>
    );
}
