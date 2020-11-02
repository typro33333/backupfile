import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
//import TableFooter from '@material-ui/core/TableFooter';

import Loading from "../../../Loading/Loading";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#fafafa',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  
}))(TableRow);



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  row2: {
    minWidth: 200
  }
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const value = props.value;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.row2}>Name</StyledTableCell>
              <StyledTableCell >Country</StyledTableCell>
  
             
            </TableRow>
          </TableHead>
          <TableBody>
            <Loading value={value}/>
            {(rowsPerPage > 0
                  ? value.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : value
                ).map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell className={classes.row2}  component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell  component="th" scope="row">
                  {row.country_name}
                </StyledTableCell>
                
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component={Paper}
        count={value.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      </TableContainer>
    )
  
  
}
