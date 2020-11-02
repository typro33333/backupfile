import React from 'react';
//import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';


const useStyles = makeStyles((theme) =>({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 540,
  }
}));

export default function Orders(props) {
  const rows = props.sim;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Grid item xs ={12}>
        <TableContainer className={classes.container} component ={Paper}>
        <Table size="medium" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>OTP</TableCell>  
              <TableCell>Rawmessage</TableCell>
              <TableCell>Shops</TableCell>
              <TableCell>Channel</TableCell>
              <TableCell align="right">Time Stamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id} hover role="checkbox">
                <TableCell>
                {row.OTP}
                </TableCell>
                <TableCell>{row.Rawmessage}</TableCell>
                <TableCell>{row.Shops}</TableCell>
                <TableCell>{row.Channel}</TableCell>
                <TableCell align="right">{row.TimeStamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      <TablePagination
      rowsPerPageOptions={[5,10,20]}
      component={Paper}
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      />
        </Grid>
  );
}
