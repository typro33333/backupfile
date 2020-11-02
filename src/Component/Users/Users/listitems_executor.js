
import {to_slug} from '../../../Regex/to_slug';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import {Box} from '@material-ui/core';
import {Link} from 'react-router-dom';
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function Orders(props) {
  const classes = useStyles();
  const data = props.data;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  if(data.length === 0)
    return (
      <Box>
      <TableContainer className={classes.container} component ={Paper}>
      <Table size="medium" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
          <TableCell>Account</TableCell>
            <TableCell align= "right" >Last login</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      </TableContainer>
      <Box style = {{textAlign:'center',padding:"24px"}} component = {Paper}>
          Not have user
      </Box>
      </Box>
    )
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="flex-end" m={1} p={1}>
        <Box p={1} flexGrow={1}>
        
        </Box>
      </Box>
      <TableContainer className={classes.container} component ={Paper}>
      <Table size="medium" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
          <TableCell>Account</TableCell>
          <TableCell align= "right" >Last login</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => (
            <TableRow key={i} hover role="checkbox">
              <TableCell>
                <Link style={{textDecoration:"underline"}} to = {"/user/" + row.id +"/"+ to_slug(`${row.user_name}`)}>
                  {row.user_name}
                </Link>
              </TableCell>
              <TableCell align= "right">{row.last_login}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
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