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

import Title from "../../../Title/Title"

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
    maxWidth: 20,
  }
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  
  const value = [];
  value.push(props.value)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <React.Fragment>
      <Title>
        {props.title}
      </Title>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Postal Code</StyledTableCell>
     
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
                ? value.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : value
              ).map((row) => (
              <StyledTableRow  key={row.name}>
                <StyledTableCell className={classes.row2} scope="row1">
                      {row.name}   
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.postl_code}
                </StyledTableCell>
               
              </StyledTableRow>
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
