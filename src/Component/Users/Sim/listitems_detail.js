import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Title from '../../Title/Title';
import Paper from '@material-ui/core/Paper';
import Dialog from '../../Dialog/dialog';
import TablePagination from '@material-ui/core/TablePagination';
import { Button, Typography ,Box} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
//import Tags from '../../Tags/tags';
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  txtDetail:{
    cursor:"pointer",
    color:"#72bcd4",
    textDecoration:"underline"
  }
});

export default function Orders(props) {
  const classes = useStyles();
  var rows = props.data;
  const [open,setOpen] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [information,setInformation] = React.useState({
    context:"",
    title:"Raw message: ",
    phoneNumber:""
  });

  const dialog_props ={
    open:open,
    title:information.title,
    phoneNumber:information.phoneNumber,
    context:information.context
  }
  if(rows.length === 0)
    return (
      <React.Fragment>
      <Title>Phone: {props.number}</Title>
      <TableContainer className={classes.container} component ={Paper}>
      <Table size="medium" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
          <TableCell>Phone Owner</TableCell>
            <TableCell>OTP</TableCell>
            <TableCell>Time Received</TableCell>
            <TableCell align="center">From Number</TableCell>
            <TableCell align="right">Raw Message</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      </TableContainer>
      <Box style = {{textAlign:'center',padding:"24px"}} component = {Paper}>
          Not have raw message
      </Box>
      </React.Fragment>
    )
  return (
    <React.Fragment>
      <Title>Phone: {props.number}</Title>
      <TableContainer className={classes.container} component ={Paper}>
      <Table size="medium" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
          <TableCell>Phone Owner</TableCell>
            <TableCell><LockIcon style={{fontSize:"22px",position:'absolute',left:"50px"}}/>  OTP</TableCell>
            <TableCell><WatchLaterIcon style={{fontSize:"22px",position:'absolute',left:"58px"}}/>Time</TableCell>
            <TableCell align="center"><PhoneForwardedIcon style={{fontSize:"22px",position:'absolute',left:"173px"}}/>From Number</TableCell>
            <TableCell align="right">Raw Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => (
            <TableRow key={i} hover role="checkbox">
              <TableCell>{row.phone_owner}</TableCell>
              <TableCell>
                {row.otp}
              </TableCell>
              <TableCell>
                {`Time: ${row.time} || Date: ${row.date}`} 
              </TableCell>
              <TableCell align="center">{row.from_number}</TableCell>
              <TableCell align="right"><Typography className = {classes.txtDetail} onClick = {()=>{setOpen(true); 
              setInformation({
              context:row.raw_message,
              phoneNumber:row.phone_owner
              })}}>Detail</Typography></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component={Paper}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Dialog {...dialog_props} btnClose = {<Button onClick = {() => {setOpen(false)}}>Oke</Button>}/>
    </React.Fragment>
  );
}