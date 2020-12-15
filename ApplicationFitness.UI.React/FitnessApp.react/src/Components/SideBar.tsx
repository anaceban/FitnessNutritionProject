import React, { useContext, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { adminLinks, links, linksProfile, linksSide, paths } from '../links/NavbarLinks';
import { BrowserRouter as Router, useHistory } from "react-router-dom"
import UserContext from '../Context/UserContext';
import { Button } from '@material-ui/core';
import SignOut from '../Components/SignOut';
import authService from '../services/authService';
import Link from '@material-ui/core/Link';
import { FitnessCenterOutlined, Home } from '@material-ui/icons';
import FastfoodIcon from '@material-ui/icons/Fastfood';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        display: 'flex',
        backgroundColor: "black"
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: 'rgb(2,0,36)',
        background: 'linear-gradient(90deg, rgba(57,117,120,1) 0%, rgba(0,0,0,0.7287289915966386) 40%, rgba(0,78,74,1) 100%)'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        backgroundImage: 'url(https://images.hdqwalls.com/download/girl-fitness-model-pic-1920x1080.jpg)'
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: 'rgb(2,0,36)',
        background: 'linear-gradient(90deg, rgba(57,117,120,1) 0%, rgba(0,0,0,0.7287289915966386) 40%, rgba(0,78,74,1) 100%)'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    list: {
        width: 250,
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`,
    },
    rootafter: {
        color: 'black',
    },
    button: {
        color: 'white',


    },
    homeButton: {
        color: 'white',
    },

}));
export default function SideBar() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openLog, setOpenLog] = React.useState(false);
    const userContext = useContext(UserContext);
    const { isAdmin, token } = userContext.user;
    const history = useHistory();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const onSingout = async () => {
        await authService.logOut();
        userContext.onLogOut();
        history.replace(paths.HomePage);
        setOpenLog(false);
    };
    const onCancel = () => {

        setOpenLog(false);
    };

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}

                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon htmlColor={"white"} /> : <ChevronRightIcon />}
                        </IconButton>
                        <IconButton
                            aria-label="open drawer"
                            edge="start"

                        >
                            {!userContext.user.isSucces && <Link href={paths.HomePage} className={classes.homeButton}><Home fontSize="large" color='action' /></Link>}
                            {userContext.user.token && !userContext.user.isAdmin && <Link href={paths.HomePage} className={classes.homeButton}><FitnessCenterOutlined /><FastfoodIcon></FastfoodIcon></Link>}
                            {userContext.user.isAdmin && <Link href={paths.HomePage} className={classes.homeButton}><Home fontSize="large" color='action' /></Link>}
                        </IconButton>
                        {userContext.user.token && <Button onClick={() => { setOpenLog(true) }} className={classes.button} variant="outlined">
                            SignOut
                        </Button>}

                    </div>
                    <Divider />
                    <List component="nav">
                        {userContext.user.token && !isAdmin && linksProfile.map(({ title, path }) => (
                            <Link href={path} key={title} className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary={title} />
                                </ListItem>
                            </Link>
                        ))}
                        {!userContext.user.token && linksSide.map(({ title, path }) => (
                            <Link href={path} key={title} className={classes.linkText}>
                                <ListItem button key={title}>
                                    <Link href={path} className={classes.linkText}><ListItemText primary={title} /></Link>
                                </ListItem>
                            </Link>

                        ))}
                        {userContext.user.isAdmin && adminLinks.map(({ title, path }) => (
                            <Link href={path} key={title} className={classes.linkText}>
                                <ListItem button key={title}>
                                    <Link href={path} className={classes.linkText}><ListItemText primary={title} /></Link>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
            </div>
            <SignOut open={openLog} logout={onSingout} cancel={onCancel} />
        </Router >

    );
}