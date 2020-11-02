import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Box} from '@material-ui/core';

export default function AlertDialog(props) {
  return (
      <Dialog
        open={props.open}
        onClose = {props.onClosediglog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth ={props.maxWidth}
        fullWidth = {props.fullWidth}
      >
        <DialogTitle id="alert-dialog-title">{props.title}{` `}{props.phoneNumber}</DialogTitle>
        <DialogContent>
          {props.table}
          <DialogContentText id="alert-dialog-description">
          <Box display="flex" flexDirection="row" p={1} m={1}>
            <Box p={1}>
              {props.context}
            </Box>
            <Box p={1} style ={{marginTop:"12px"}}>
              {props.btnAdd}
            </Box>
          </Box>
            {props.alert}
          </DialogContentText>
          <DialogContentText>
            {props.context1}
          </DialogContentText>
          <DialogContentText>
            {props.context2}
          </DialogContentText>
          <DialogContentText>
            {props.context3}
          </DialogContentText>
          <DialogContentText>
            {props.context4}
          </DialogContentText>
          <DialogContentText>
            {props.context5}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box style ={{padding:"8px"}}>
            {props.btnClose}
          </Box>
          <Box>
            {props.btnCofirm}
          </Box>
        </DialogActions>
      </Dialog>
  );
}