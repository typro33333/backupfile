import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Dialog from '../../Dialog/dialog';
import TablePagination from '@material-ui/core/TablePagination';
import { Button,Box} from '@material-ui/core';
import {useStyles} from './bootrap';
import {FormControl,Input,InputAdornment,} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Checkbox from '@material-ui/core/Checkbox';
export default function Orders(props) {
  const classes = useStyles();
  const rows = props.data_url;
  var data_url_not_in_sim = props.data_url_not_in_sim;
  const [page1, setPage1] = React.useState(0);
  const [rowsPerPage1, setRowsPerPage1] = React.useState(5);
  const handleChangePage1 = (event, newPage) => {
    setPage1(newPage);
  };
  const handleChangeRowsPerPage1 = (event) => {
    setRowsPerPage1(+event.target.value);
    setPage1(0);
  };
  var table = 
  <Box>
  <TableContainer className={classes.container} component ={Paper}>
  <Table size="small" stickyHeader aria-label="sticky table">
    <TableHead>
      <TableRow>
      <TableCell>URL have not in sim</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data_url_not_in_sim.slice(page1 * rowsPerPage1, page1 * rowsPerPage1 + rowsPerPage1).map((row,i) => (
        <TableRow key={i} hover role="checkbox">
          <TableCell><Checkbox size="small" onClick ={props.handleCheck} value={row.id}/>{row.url}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  </TableContainer>
  <TablePagination
    rowsPerPageOptions={[5, 10, 20]}
    component={Paper}
    count={data_url_not_in_sim.length}
    rowsPerPage={rowsPerPage1}
    page={page1}
    onChangePage={handleChangePage1}
    onChangeRowsPerPage={handleChangeRowsPerPage1}
  />
  </Box>
  const dialog ={
    open:props.openDialog,
    onClosediglog:props.onClosediglog,
    title:"Url have not in sim",
    btnClose : <Button  color ="primary" onClick ={props.onClosediglog}>Close</Button>,
    btnCofirm : <Button color ="primary" onClick = {props.btnCofirm}>Cofirm</Button>,
    table: table,
    maxWidth : 'lg',
    fullWidth : true,
  }
  if(rows.length === 0)
    return (
      <React.Fragment>
        <Box display="flex" justifyContent="flex-end" m={1} p={1}>
        <Box p={1} flexGrow={1}>
          <FormControl fullWidth variant="outlined" size="small">
            <Input
            multiline
            type = "number"
            className = {classes.text}
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
            labelWidth={30}
            placeholder = "Search Phone Number"
            />
          </FormControl>
        </Box>
        <Box p={1} className = {classes.box}>
          <Button startIcon ={<DeleteOutlineIcon/>} disabled className={classes.widthbtn} color ="secondary" variant="contained">Url</Button>
        </Box>
        <Box p={1} className = {classes.box}>
          <Button startIcon ={<AddIcon/>} className={classes.widthbtn} onClick={props.handleaddurl} color ="primary" variant="contained">Url</Button>
        </Box>
      </Box>
      <TableContainer className={classes.container_of_urlsim} component ={Paper}>
      <Table size="medium" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      </TableContainer>
      <Box style = {{textAlign:'center',padding:"24px"}} component = {Paper}>
          Not have url of sim
      </Box>
      {<Dialog {...dialog} />}
      </React.Fragment>
    )
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="flex-end" m={1} p={1}>
        <Box p={1} flexGrow={1}>
          <FormControl fullWidth variant="outlined" size="small">
            <Input
            multiline
            type = "number"
            className = {classes.text}
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
            labelWidth={30}
            onChange = {props.text}
            placeholder = "Search Phone Number"
            />
          </FormControl>
        </Box>
        <Box p={1} className = {classes.box}>
          <Button startIcon ={<DeleteOutlineIcon/>} className={classes.widthbtn} onClick={props.handledelete} color ="secondary" variant="contained">Url</Button>
        </Box>
        <Box p={1} className = {classes.box}>
          <Button startIcon ={<AddIcon/>} className={classes.widthbtn} onClick={props.handleaddurl} color ="primary" variant="contained">Url</Button>
        </Box>
      </Box>
      <TableContainer className={classes.container} component ={Paper}>
      <Table size="medium" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
          <TableCell>URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.funcSearch? 
          props.list.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((row,i) => (
            <TableRow key={i} hover role="checkbox">
              <TableCell>
              <Checkbox 
              size="small"
              value = {row.id}
              name = {i}
              checked={row.active}
              onChange={props.handleCboxSearch}
              /> {row.url}</TableCell>
            </TableRow>))
          :
          rows.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((row,i) => (
            <TableRow key={i} hover role="checkbox">
              <TableCell><Checkbox 
              size="small"
              value = {row.id}
              name = {i} 
              checked={row.active}
              onChange={props.handleCheckbox}
              />{row.url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component={Paper}
        count={rows.length}
        rowsPerPage={props.rowsPerPage}
        page={props.page}
        onChangePage={props.handleChangePage}
        onChangeRowsPerPage={props.handleChangeRowsPerPage}
      />
      {<Dialog {...dialog} />}
    </React.Fragment>
  );
}