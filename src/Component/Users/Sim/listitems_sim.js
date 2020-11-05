import React from 'react';
import Table from '@material-ui/core/Table';
import {TableBody,Box,Button,InputAdornment,Input,FormControl, TextField ,Checkbox} from '@material-ui/core/';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import SearchIcon from '@material-ui/icons/Search';
import {useStyles} from './bootrap';
import RefreshIcon from '@material-ui/icons/Refresh';
import {to_slug} from '../../../Regex/to_slug';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import {status,checkDate} from '../../../Module/module_sim';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Tooltip from '@material-ui/core/Tooltip';

export default function Orders(props) {
  const classes = useStyles();
  const date = new Date();
  const datenow = (date.getMonth()+1)+"/"+date.getDate()+ "/" + date.getFullYear();
  const rows = props.data;
  const lengthBox = function(checked){
    if(checked.length === 0)
      return(<Box p={1} className = {classes.box}>
        <Button startIcon ={<MonetizationOnIcon/>} className={classes.widthbtn} disabled color ="primary" variant="contained">Balance</Button>
      </Box> )
    else if(checked.length > 0)
        return(
        <Box p={1} className = {classes.box}>
          <Button startIcon ={<MonetizationOnIcon/>} className={classes.widthbtn} onClick={props.checkbanlancedd} color ="primary" variant="contained">Balance</Button>
        </Box>)
  }
  const tagg = function(tags){
    var word = tags.split('#');
    if(word[1] === undefined)
      return '#'
    return '#'+ word[1];
  }
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
        <Box p={1} >
          <TextField 
          select
          label="Type Search"
          style = {{minWidth:"120px"}}
          onChange={props.handleChangeTypeSearch}
          value = {props.searchDefault}
          >
            {props.typesearch.map((option) => (
                <option
                style ={{cursor:"pointer",padding:"10px",fontSize:"16px"}}
                key={option.label} 
                value = {option.label}>
                  {option.label}
                </option >
            ))}
          </TextField>
        </Box>
        <Box p={1} >
          <TextField 
          select
          label="Status"
          style = {{minWidth:"120px"}}
          onChange={props.handleChangeStatus}
          value = {props.statusDefault}
          >
            {props.statusLabel.map((option) => (
                <option
                style ={{cursor:"pointer",padding:"10px",fontSize:"16px"}}
                key={option.label} 
                value = {option.label}>
                  {option.label}
                </option >
            ))}
          </TextField>
        </Box>
        <Box p={1} >
          <TextField 
          select
          label="Expire Date"
          style = {{minWidth:"120px"}}
          onChange={props.handleChangeExpire}
          value = {props.expireDateDefault}
          >
            {props.expireLabel.map((option) => (
                <option
                style ={{cursor:"pointer",padding:"10px",fontSize:"16px"}}
                key={option.label} 
                value = {option.label}>
                  {option.label}
                </option >
            ))}
          </TextField>
        </Box>
        {lengthBox(props.arr_index)}
        <Box p={1} className = {classes.box}>
          <Button startIcon ={<LocalOfferIcon style={{fontSize:"19px"}}/>} className={classes.widthbtn} onClick={props.handleAddTag} color ="primary" variant="contained">Add Tags</Button>
        </Box>
        {props.disableBtn? 
        <Box p={1} className = {classes.box}>
          <Button startIcon ={<RefreshIcon/>} className={classes.widthbtn} disabled color ="primary" variant="contained">Checking...</Button>
        </Box>
        :
        <Box p={1} className = {classes.box}>
          <Button startIcon ={<RefreshIcon/>} className={classes.widthbtn} onClick={props.handleRefesh} color ="primary" variant="contained">Sim</Button>
        </Box>}
      </Box>
      <TableContainer className={classes.container} component ={Paper}>
      <Table size="medium" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align ="left" style={{width:"230px"}}>
            <Checkbox
                size="small"
                onChange={props.handleCboxAll}
            />
              Phone Number
            </TableCell>
            <TableCell style={{}}>
              <LocalOfferIcon style={{fontSize:"24px",position:'absolute',left:"55px"}}/> #Tag  
            </TableCell>
            <TableCell>
              <DateRangeIcon style={{fontSize:"24px",position:'absolute',left:"100px"}}/> Expire Date  
            </TableCell>
            <TableCell>
            <MonetizationOnIcon style={{fontSize:"24px",position:'absolute',left:"80px"}}/>Balance
            </TableCell>
            <TableCell>
            <PowerSettingsNewIcon style={{fontSize:"24px",position:'absolute',left:"70px"}}/>Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.changeData? 
          props.list.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((row,i) => (
            <TableRow key={i} hover role="checkbox" >
              {row.status?
              <TableCell> 
              <Checkbox
                size="small"
                value = {row.sim_number}
                name = {i}
                checked = {row.active}
                onChange={props.handleCbox}
              />
                <Link style={{textDecoration:"underline"}} to = {"/sim/"+ to_slug(`${row.sim_number}`)}>{row.sim_number}</Link>
              </TableCell>
              :
              <TableCell> 
              <Checkbox
                size="small"
                disabled
              />
                <Link style={{textDecoration:"underline"}} to = {"/sim/"+ to_slug(`${row.sim_number}`)}>{row.sim_number}</Link>
              </TableCell>}
              <TableCell>
                <Tooltip title = {row.tag} arrow>
                <Button>
                  {tagg(row.tag)}
                </Button>
              </Tooltip></TableCell>
              <TableCell>{checkDate(datenow,row.expire_date)}</TableCell>
              <TableCell>{row.balance} VNĐ</TableCell>
              <TableCell>{status(row.status)}</TableCell>
            </TableRow>
          ))
          :
          rows.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((row,i) => (
            <TableRow key={i} hover role="checkbox" >
              {row.status?
              <TableCell>
              <Checkbox
                size="small"
                value = {row.sim_number}
                name = {i}
                checked = {row.active}
                onChange={props.handleCbox}
              />
                <Link style={{textDecoration:"underline"}} to = {"/sim/"+ to_slug(`${row.sim_number}`)}>{row.sim_number}</Link>
              </TableCell>
              :
              <TableCell> 
              <Checkbox
                size="small"
                disabled
              />
                <Link style={{textDecoration:"underline"}} to = {"/sim/"+ to_slug(`${row.sim_number}`)}>{row.sim_number}</Link>
              </TableCell>}
              <TableCell><Tooltip title = {row.tag} arrow><Button>{tagg(row.tag)}</Button></Tooltip></TableCell>
              <TableCell>{checkDate(datenow,row.expire_date)}</TableCell>
              <TableCell>{row.balance} VNĐ</TableCell>
              <TableCell>{status(row.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
      rowsPerPageOptions ={[5,10,20]}
      component={Paper}
      count={rows.length}
      page={props.page}
      onChangePage={props.handleChangePage}
      rowsPerPage={props.rowsPerPage}
      onChangeRowsPerPage={props.handleChangeRowsPerPage}
    />
    </React.Fragment>
  );
}
