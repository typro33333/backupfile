import React from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';

//////////////////////
function inputurl(data,query){
    const filterItems = (data, query) => {
        return data.filter(el =>el.url.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    if(query !== ''){
        return filterItems(data,query);
    }
    return data;
}
export function searchurl(data,query){
    var arr = inputurl(data,query);
    return arr;
}

///////////////////////
export function currentData(data,query,status,expiredate,typesearch){
    var arr = [];
    if(typesearch === 'Phone Number'){
        arr = search(data,query);
    }
    else if(typesearch === '#Tags'){
        arr = searchtag(data,query);
    }
    arr = filterStatus(arr,status);
    arr = filterExpireDate(arr,expiredate);
    return arr;
}

function searchtag(data,query){
    const filterItems = (data, query) => {
        return data.filter(el =>el.tag.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    if(query !== ''){
        return filterItems(data,query);
    }
    return data;
}

function search(data,query){
    const filterItems = (data, query) => {
        return data.filter(el =>el.sim_number.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    if(query !== ''){
        return filterItems(data,query);
    }
    return data;
}
function filterStatus(data,status){
    const filterItems = (data,type) => {
        return data.filter(el => el.status === type);
    }
    if(status === "Online")
        return filterItems(data,true);
    else if (status === "Offline")
        return filterItems(data,false);
    return data
}
function filterExpireDate(data,expiredate){
    var diffTime,i = 1;
    var diffDays = 2;
    var arr = [];
    const filterItems = (arr,type) => {
        return arr.filter(el => el.expire_date === type);
    }
    const date = new Date();
    var datenow = (date.getMonth()+1)+"/"+date.getDate()+ "/" + date.getFullYear();
    const date1 = new Date(datenow);
    if(expiredate === "Good")
        for( i = 0;i<data.length;i++){
            const date2 = new Date(data[i].expire_date);
            if((date2 - date1) > 0){
                diffTime = Math.abs(date2 - date1);
                diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if(diffDays > 7)
                    arr.push(filterItems(data,data[i].expire_date)[0]);
            }
        }
    else if(expiredate === "Warning")
        for( i = 0;i<data.length;i++){
            const date2 = new Date(data[i].expire_date);
            if((date2 - date1) > 0){
                diffTime = Math.abs(date2 - date1);
                diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if(diffDays < 7)
                    arr.push(filterItems(data,data[i].expire_date)[0]);
            }
        }
    else if(expiredate === "Danger")
        for( i = 0;i<data.length;i++){
            const date2 = new Date(data[i].expire_date);
            if((date2 - date1) < 0){
                diffTime = (date2 - date1);
                diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                console.log(diffDays)
                if(diffDays < 0)
                    arr.push(filterItems(data,data[i].expire_date)[0]);
            }
        }
    else
        arr = data;
    return arr;
}

///////////////////
//UI
//////////////////

export const status = function(status){
    if(Number(status) === 0)
      return <div style ={{color:"#ababab",display:'flex'}}><div style ={{paddingRight:"8px",marginTop:"2px"}}>Offine</div> <FiberManualRecordIcon fontSize = "small" style ={{color:"#ababab"}}/> </div>
    return <div style = {{color:"#008729",display:'flex'}}><div style ={{paddingRight:"8px",marginTop:"2px"}}>Online</div><FiberManualRecordIcon fontSize = "small" style ={{color:"#008729"}}/></div>
}

export const checkDate = (datecurrency,datesim) => {
    const date1 = new Date(datecurrency.toString());
    const date2 = new Date(datesim);
    var diffTime = 1;
    var diffDays = 2;
    if((date2 - date1) < 0){
      return (<div style ={{color:"#F50900",display:"flex"}}><div style={{paddingRight:"8px",marginTop:"2px"}}>{datesim}</div> <ErrorIcon fontSize="small"/> </div>)
    }
    else if (date2 - date1 >= 0){
      diffTime = Math.abs(date2 - date1);
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    if(diffDays < 7){
      return (<div style ={{color:"#F5B424",display:"flex"}}><div style={{paddingRight:"8px",marginTop:"2px"}}>{datesim}</div> <WarningIcon fontSize="small"/></div>);
    }
    return (<div style = {{color:"#008729"}}>{datesim}</div>);
}
