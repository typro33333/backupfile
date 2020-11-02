import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '98%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    paddingLeft:"22px"
  },
}));

export default function SimpleAlerts(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Collapse in={props.OpenAlert}>
        <Alert 
        action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={props.closeal}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity="error">
            {props.title}
          </Alert>
      </Collapse>
    </div>
  );
}