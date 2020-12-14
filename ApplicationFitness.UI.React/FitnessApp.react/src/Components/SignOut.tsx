import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, makeStyles } from '@material-ui/core/';
import React from 'react';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import Slide from '@material-ui/core/Slide'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
    submit: {
        backgroundColor: '#00796b',
        color: "white"
    }
}));

export interface SingoutProps{
    open:boolean,
    logout:() => void,
    cancel:() => void
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
    ) {
    return <Slide direction="up" ref={ref} {...props} />;
    });
export default function SignOutButton(props:SingoutProps){
    const classes = useStyles();
    const {open,logout, cancel} = props;
    return (

        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={cancel}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title" style={{backgroundColor:'#004752', color: 'white'}}>{"Are you sure?"}</DialogTitle>
            <DialogContent style={{backgroundColor:'#004752'}}>
                <DialogContentText id="alert-dialog-slide-description" style={{color:'white'}}>
                    You can stay here or sign out.
                    </DialogContentText>
            </DialogContent>
            <DialogActions style={{backgroundColor:'#004752'}}>
                <Button onClick={cancel} variant="outlined" style={{color:'#004752', backgroundColor:'white'}} startIcon={<GetAppIcon></GetAppIcon>}>
                    Stay
                    </Button>
                <Button onClick={logout} variant="outlined" style={{color:'#004752', backgroundColor:'white'}} startIcon={<ExitToAppIcon></ExitToAppIcon>}>
                    SignOut
                    </Button>
            </DialogActions>
        </Dialog>
    )
}
