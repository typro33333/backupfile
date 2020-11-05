import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Menubar from '../Menubar/Mbar_primary';
import './appbar.css';
import Menu2 from '../Menubar/Mbar_secondary';
import Avatar from '@material-ui/core/Avatar';
import {useHistory} from 'react-router';
import { Box,Button } from '@material-ui/core';
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

//import Button from './button';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Epsilo.io
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeight: {
    height: 240,
  },
  icon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  }
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const history = useHistory();
  const ckeckdrawer = function(){
  if(sessionStorage.getItem('drawer')==='true')
    return true;
  return false;
  }
  const [open,setOpen] = React.useState(ckeckdrawer());
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open1, setOpen1] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const handleDrawerOpen = async() => {
    await sessionStorage.setItem('drawer',true);
    if(sessionStorage.getItem('drawer')==='true')
    setOpen(true);
    return
  };
  const handleDrawerClose = async () => {
    await sessionStorage.setItem('drawer',false);
    if(sessionStorage.getItem('drawer')==='false')
    setOpen(false);
  };
  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('image_user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    history.push({
      pathname:"/login"
    });
  }
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen1((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  return (
    <Box>
      <Popper open={open1} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Button startIcon={<SettingsIcon />}>Setting Account</Button>
              <br />
              <Button onClick = {logout()} startIcon={<ExitToAppIcon />}>Exit</Button>
            </Paper>
          </Fade>
        )}
      </Popper>
    <Box className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <img src="https://www.epsilo.io/img/logo/epsilo-logo.png" alt="" height="55px" width="130px" />
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          </Typography>
            <Box style ={{paddingRight:"8px"}}>Welcome {sessionStorage.getItem('user')}</Box>
            <Box style ={{paddingRight:"8px"}}>
            <Avatar 
            src={sessionStorage.getItem('image_user')} 
            className={classes.icon}
            />
            </Box>
          <IconButton color="inherit" onClick = {handleClick("bottom-start")}>
            <ExitToAppIcon
            color="action"
            style={{fontSize:"25px"}}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <Box className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />
            <Menubar />
        <Divider />
            <Menu2 />
        </Drawer>  
      <main className={classes.content}>
        <Box className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {props.breadcrumb}
          {props.table}
          {props.table_2}
          {props.table_3}
        </Container>
      </main>
    </Box>
        <Box className="footer">
            <Box >
            <img src="https://www.epsilo.io/img/logo/epsilo-footer-logo.png" alt="" className="img_footer"></img>
            </Box>
            <Box>
                <br />
                <Copyright />
            </Box>
        </Box>
    </Box>
  );
}

/*
    <span style={{paddingLeft:"800px"}}><Button/></span> //164

*/