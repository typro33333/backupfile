import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Breadcrumb from '../../Breadcrumb/Breadcrumb';
import {Box,Button,Checkbox, Input} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import {useStyles} from './style';


export default function Orders(props) {
  const classes = useStyles();
  const rows = props.data;
  const listsearch = props.listsearch;
  const funcsearch = props.funcsearch;
  if(rows.length === 0)
    return(
      <Box>
      <Breadcrumb title = "Configuration" title1 = "Url"/>
      <Box display="flex" justifyContent="flex-end" m={1} p={1}>
        <Box p={1} flexGrow={1}>
          <FormControl fullWidth variant="outlined" size="small">
            <Input
            className = {classes.text}
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
            labelWidth={30}
            onChange = {props.text}
            />
          </FormControl>
        </Box>
        <Box p={1}>
            {props.btnDelete}
        </Box>
        <Box p={1}>
            <Button className={classes.widthbtn} color ="primary" variant="contained" onClick = {props.btnAddUrl}>Add URL</Button>
        </Box>
      </Box>
      <TableContainer className={classes.container} component ={Paper}>
      <Table size="medium" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell >Uniform Resource Locator (URL)</TableCell>
            <TableCell align ="center">Number Of Sim</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      </TableContainer>
      <Box style = {{textAlign:'center',padding:"24px"}} component = {Paper}>
          Not have Url
      </Box>
    {props.dialog}
    {props.alertComfirm}
    </Box>
    )
  else if(rows.length > 0)
    return (
    <React.Fragment>
      <Breadcrumb title = "Configuration" title1 = "Url"/>
      <Box display="flex" justifyContent="flex-end" m={1} p={1}>
        <Box p={1} flexGrow={1}>
          <FormControl fullWidth variant="outlined" size="small">
            <Input
            className = {classes.text}
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
            labelWidth={30}
            onChange = {props.text}
            />
          </FormControl>
        </Box>
        <Box p={1}>
            {props.btnDelete}
        </Box>
        <Box p={1}>
            <Button className={classes.widthbtn} color ="primary" variant="contained" onClick = {props.btnAddUrl}>Add URL</Button>
        </Box>
      </Box>
      <TableContainer className={classes.container} component ={Paper}>
      <Table size="medium" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell >Uniform Resource Locator (URL)</TableCell>
            <TableCell align ="center">Number Of Sim</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {funcsearch 
          ? listsearch.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((row,i) => (
            <TableRow key={i} hover role="checkbox" >
              <TableCell>
              <Checkbox
                size="small"
                value = {row.id}
                name = {i}
                checked = {row.active}
                onChange={props.handleCboxSearch}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
                {row.url}
              </TableCell>
              <TableCell align ="center">
                {row.number_of_sim}
                </TableCell>
            </TableRow>
          )) : rows.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((row,i)=> (
            <TableRow key={i} hover role="checkbox" >
              <TableCell>
              <Checkbox
                size="small"
                value = {row.id}
                name = {i}
                onChange={props.handleCheckbox}
                inputProps={{ 'aria-label': 'primary checkbox' }}
                checked = {row.active}
              />
                {row.url}
              </TableCell>
              <TableCell align ="center">
                {row.number_of_sim}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
      rowsPerPageOptions ={[5,10,20]}
      component={Paper}
      count={props.funcsearch ? props.listsearch.length : rows.length}
      page={props.page}
      onChangePage={props.handleChangePage}
      rowsPerPage={props.rowsPerPage}
      onChangeRowsPerPage={props.handleChangeRowsPerPage}
    />
    {props.dialog}
    {props.alertComfirm}
    </React.Fragment>
  );
}





