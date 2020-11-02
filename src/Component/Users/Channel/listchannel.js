import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import TablePagination from '@material-ui/core/TablePagination';
import {Box} from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#fafafa',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);





const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  row2: {
    maxWidth: 20,
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
    <React.Fragment>
      <Box display="flex" justifyContent="flex-start" m={1} p={1}>
        <Box p={1}></Box>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Executors</StyledTableCell>
              <StyledTableCell align="right">Shops</StyledTableCell>

     
            </TableRow>
          </TableHead>
           
          <TableBody>
            {(rowsPerPage > 0
                ? value.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : value
              ).map((row) => (
              <TableRow  key={row.name}>    
                <StyledTableCell className={classes.row2} scope="row1">
                <Link href={"http://localhost:3000/channel/" + row.name + "/" + row.id}>
                      {row.name}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.number_of_manager}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.number_of_shop}
                </StyledTableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </TableContainer>
      <TablePagination
              
              rowsPerPageOptions={[5, 10, 25]}
              component={Paper}
              count={value.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
    </React.Fragment>
  );
}
