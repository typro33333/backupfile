import React from 'react';
import Logo from '../Login/Logo';
//import Title from '../Login/Title';
import Button from '../Login/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundImage: `url(${Image})`,
    },
    "#global": {
    body: {
        backgroundImage: "url('/media/landing.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "100%"
    }},
}));
export default function Main(props){
    const classes = useStyles();
    return(
        <div className={classes.paper}>
                <Logo />
                <div>
                    <form onSubmit = {props.onSubmit}>
                            <Button/>
                    </form>
                </div>        
        </div>
    )
}