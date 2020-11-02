
export function currentData(data,query){
    var arr = search(data,query);
    //arr = filterStatus(arr,status);
    //arr = filterExpireDate(arr,expiredate);
    return arr;
}
function search(data,query){
    const filterItems = (data, query) => {
        return data.filter(el =>el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    if(query !== ''){
        return filterItems(data,query);
    }
    return data;
}
export function filterStatus(data,status){
    const filterItems = (data,type) => {
        return data.filter(el => el.status === type);
    }
    if(status === "Online")
        return filterItems(data,true);
    else if (status === "Offline")
        return filterItems(data,false);
    return data
}
export function filterExpireDate(data,expiredate){
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
            if((date2 - date1) > 0){
                diffTime = Math.abs(date2 - date1);
                diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if(diffDays < 0)
                    arr.push(filterItems(data,data[i].expire_date)[0]);
            }
        }
    else
        arr = data;
    return arr;
}