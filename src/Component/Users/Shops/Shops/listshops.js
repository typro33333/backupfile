import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import {Link} from 'react-router-dom';
import {Paper,Box,FormControl,Input,InputAdornment} from '@material-ui/core/';
import CircularProgress from '@material-ui/core/CircularProgress';
import TablePagination from '@material-ui/core/TablePagination';
import SearchIcon from '@material-ui/icons/Search';
import {to_slug} from '../../../../Regex/to_slug';
import {titleShop} from '../../../TitleTable/titletable';
const useStyles = makeStyles((theme) =>({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 640,
  }
}));

export default function Orders(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
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
      <Box display="flex" justifyContent="flex-end" m={1} p={1}>
        <Box p={1} flexGrow={1}>
          <FormControl fullWidth variant="outlined" size="small">
            <Input
            className = {classes.text}
            startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
            labelWidth={30}
            onChange = {props.handleSearch}
            />
          </FormControl>
        </Box>
      </Box>
      <TableContainer className={classes.container} component = {Paper}>
      <Table size="medium" stickyHeader aria-label="sticky table" >
        <TableHead>
          <TableRow>
          {titleShop.map((title) =>(
            <TableCell
            key={title.id}
            align={title.align}
            style={{ minWidth: title.minWidth }}
            >
            {title.label}</TableCell>
          ))}
          </TableRow>
        </TableHead>
          <TableBody>
        {props.searchAvailable? 
        props.list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
          <TableRow key={row.id} hover role="checkbox">
            <TableCell >
              <Link to = {"/shops/" + row.id +"/"+ to_slug(`${row.name}`)}>
                {row.name}
              </Link>
            </TableCell>
            <TableCell>{row.channel_name}</TableCell>
            <TableCell>{row.number_of_sim}</TableCell>
            <TableCell>{row.country_name}</TableCell>
          </TableRow>
          ))
        :
        props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
          <TableRow key={row.id} hover role="checkbox">
            <TableCell >
              <Link to = {"/shops/" + row.id +"/"+ to_slug(`${row.name}`)}>
                {row.name}
              </Link>
            </TableCell>
            <TableCell>{row.channel_name}</TableCell>
            <TableCell>{row.number_of_sim}</TableCell>
            <TableCell>{row.country_name}</TableCell>
          </TableRow>
          ))
        }
        </TableBody>
      </Table>
      </TableContainer>
      {loading(props.data,props.noData)}
    <TablePagination
    rowsPerPageOptions={[5, 10, 100]}
    component={Paper}
    count={props.data.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onChangePage={handleChangePage}
    onChangeRowsPerPage={handleChangeRowsPerPage}
    />
    </React.Fragment>
  );
}



