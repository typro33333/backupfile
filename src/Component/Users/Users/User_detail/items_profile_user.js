import React from 'react';
import { useStyles,columnhead } from './style';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import LINK from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import {Box} from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';

export default function Orders(props) {
  const classes = useStyles();
  const data = props.data;
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const loading = function(data,noData){
    if(data.length === 0 && noData === false)
      return <Box style = {{textAlign:'center',padding:"24px"}} component = {Paper}><CircularProgress /></Box>
    else if (data.length === 0 && noData === true)
      return <Box style = {{textAlign:'center',padding:"24px"}} component = {Paper}>Not have Data</Box>
  }
  return (
    <React.Fragment>
      <TableContainer className={classes.container} component = {Paper}>
      <Table size="medium" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columnhead.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array(data).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id} hover role="checkbox">
              <TableCell>
                  <LINK href ={`${row.correspond_apicall}`}>{row.name}</LINK>
              </TableCell>
              <TableCell>
                {row.sim_number}
              </TableCell>
              <TableCell>{row.channel_name}</TableCell>

              <TableCell align = 'center'>
                {row.country_name}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      {loading(data,props.noData)}
      <TablePagination
          rowsPerPageOptions={[5,7,15]}
          component={Paper}
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}
