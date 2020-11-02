import React from 'react';
import Dashboard from '../../Component/Dashboard/Appbar/Appbar';
import LsUrl from '../../Component/Users/Url/lsUrl';
import {addnewUrl} from '../../Serviece/Serviece';
import Button from '@material-ui/core/Button';
import {TextField} from '@material-ui/core';
import Dialog from '../../Component/Dialog/dialog';
import AlertMessage from '../../Component/Alert/alert';
import {getallUrl,deletedUrl} from '../../Serviece/Serviece';
import Success from '../../Component/SnackBar/sucess';
import Error from '../../Component/SnackBar/error';
export default class Sim extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            arr_indexx:[],
            textInput:"",
            open: false,
            Openal:false,
            search:"",
            data:[],
            funcsearch:false,   
            list:[],
            titlesuccess:'',
            page:0,
            rowsPerPage:5,
            urlInput:'',
            Openall:false,
            successDialog:false,
            errorDialog:false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    async componentDidMount(){
        document.title = 'Epsilo | Url';
        const token = sessionStorage.getItem('token');
        if(token === null)
            return this.props.history.push('/login');
        await getallUrl().then(res =>{
            if(res !== ""){
                res.forEach(element => {
                    element.active = false
                });
                this.setState({data:res});
            }
        });
    }
    handleCheckbox = (event) =>{
        const arr = this.state.arr_indexx;
        var index = arr.indexOf(event.target.value);
        var i = event.target.name;
        const arrdata = this.state.data;
        if (event.target.checked === true){
            arrdata[Number(this.state.page) * Number(this.state.rowsPerPage) + Number(i)].active = true;
            this.setState({data:arrdata});
            arr.splice(0,0,event.target.value);
        }
        else if(index !== -1 || event.target.checked === false) {
                arrdata[Number(this.state.page) * Number(this.state.rowsPerPage) + Number(i)].active = false;
                this.setState({data:arrdata})
                arr.splice(index, 1);
        }
        this.setState({arr_indexx:arr});
    }
    handleCboxSearch = (event) => {
        const arr = this.state.arr_indexx;
        const listdata = this.state.list;
        var index = arr.indexOf(event.target.value);
        if(event.target.checked === true){
            listdata[Number(this.state.page) * Number(this.state.rowsPerPage) + Number(event.target.name)].active = true;
            this.setState({list:listdata});
            arr.splice(0,0,event.target.value)
        }
        else if(event.target.checked === false){
            listdata[Number(this.state.page) * Number(this.state.rowsPerPage) + Number(event.target.name)].active = false;
            this.setState({list:listdata});
            arr.splice(index,1);
        }
        this.setState({arr_indexx:arr});
    }
    handleChange(event){
        this.setState({
            textInput: event.target.value
        });
    }
    onClosediglog =() => {
        this.setState({
            open:false
        })
    }
    btnAddUrl = () => {
        this.setState({
            open: true
        });
    }
    handleText = (event) => {
        this.setState({newUrl: event.target.value});
    }
    closeal = () => {
        this.setState({Openal:false,Openall:false})
    }
    handleSearch = async (event) =>{
        await this.setState({
            search:event.target.value
        });
        const filterItems = (arr, query) => {
            return arr.filter(el => el.url.toLowerCase().indexOf(query.toLowerCase()) !== -1)
        }
        await this.setState({
            funcsearch:true,
            list:filterItems(this.state.data,this.state.search)
        });
        if(this.state.search === "")
        this.setState({funcsearch:false});
    }
    handleChangePage = (event,newPage) =>{
        this.setState({page:newPage})
    }
    handleChangeRowsPerPage = (event) =>{
        this.setState({rowsPerPage:parseInt(event.target.value,10)});
        this.setState({page:0});
    }
    onCheckUrl = (event) => {
        this.setState({urlInput:event.target.value})
    }
    btnCofirm = () => {
        if(this.state.urlInput === '')
            return <Button color ="primary" disabled>Cofirm</Button>
        return <Button color ="primary" onClick ={this.cofirmInput}>Cofirm</Button>
    }
    cofirmInput = async() => {
        if(this.state.urlInput.indexOf("http://") === 0 || this.state.urlInput.indexOf("https://") === 0){
            await addnewUrl(this.state.urlInput).then(async res =>{
                console.log(res)
                if(res === true)
                    await getallUrl().then(res =>{
                        if(res !== '')
                        res.forEach(element => {
                            element.active = false
                        });
                        this.setState({data:res,urlInput:'',open:false,titlesuccess:"Add url complete",successDialog:true});
                        setTimeout(()=>this.setState({successDialog:false}),8000);
                        return
                    })
                else if(res.message !== '') {
                    this.setState({Openall:true});
                    setTimeout(()=>this.setState({Openall:false}),8000);
                    return
                }
            })
        }
        else{
            this.setState({Openal:true});
            setTimeout(()=>this.setState({Openal:false}),8000);
            return
        } 
    }
    closeSuccessdialog = (event,reason) => {
            if (reason === 'clickaway') {
              return;
            }
            this.setState({successDialog:false,errorDialog:false})
    }
    btnDelete = () => {
        if(this.state.arr_indexx.length > 0)
            return(
                <Button
                style ={{minWidth:"120px",minHeight:"10px",height:"41px",marginTop:"8px"}}
                color ="secondary" 
                variant="contained"
                onClick = {this.cofirmDeleteUrl}
                >
                Delete
                </Button>)
        return(
        <Button 
        style ={{minWidth:"120px",minHeight:"10px",height:"41px",marginTop:"8px"}}
        disabled 
        variant="contained">
        Delete
        </Button>)
    }
    cofirmDeleteUrl = async() => {
        await deletedUrl(this.state.arr_indexx).then(async res => {
            if(res === true)
                await getallUrl().then(async res =>{
                if(res !== ""){
                    res.forEach(element => {
                        element.active = false
                    });
                    await this.setState({titlesuccess:"Delete url complete"})
                    this.setState({data:res,arr_indexx:[],successDialog:true});
                    setTimeout(()=>this.setState({successDialog:false}),8000);
                    return;
                }})
            else if(res.message !== '')
                this.setState({errorDialog:true,titlesuccess:"Url have been registered from sim"})
        })
    }
    render()
    {   
        const ConfigText = {
            label:"New Url",
            placeholder:"Input new URL",
            fullWidth:true,
        }
        const dymaticDiglog = {
            title: "Input new URl",
            maxWidth : 'md',
            fullWidth : true,
        }
        return(
        <Dashboard 
        table_3 ={<Error 
            open ={this.state.errorDialog}
            handleClose = {this.closeSuccessdialog}
            titlesuccess = {this.state.titlesuccess}
            />}
        table_2 = {<Success 
            open ={this.state.successDialog} 
            handleClose = {this.closeSuccessdialog} 
            titlesuccess = {this.state.titlesuccess} />}
        table = {<LsUrl 
            btnDelete = {this.btnDelete}
            page = {this.state.page}
            handleChangePage = {this.handleChangePage}
            rowsPerPage = {this.state.rowsPerPage}
            handleChangeRowsPerPage = {this.handleChangeRowsPerPage}
            handleCheckbox = {this.handleCheckbox}  
            handleCboxSearch = {this.handleCboxSearch}
            checked = {this.state.arr_indexx}
            addnewurl = {this.addnewurl}
            btnAddUrl = {this.btnAddUrl}
            text = {this.handleSearch}
            listsearch = {this.state.list}
            funcsearch = {this.state.funcsearch}
            data = {this.state.data}
            dialog = {
                <Dialog
                    open = {this.state.open}
                    onClosediglog = {this.onClosediglog}
                    {...dymaticDiglog}
                    btnClose = {<Button  color ="primary" onClick ={()=>{this.setState({open:false})}}>Close</Button>}
                    btnCofirm = {this.btnCofirm}
                    context = {
                        <TextField
                        {...ConfigText} 
                        style ={{width:"860px"}}
                        onChange = {this.onCheckUrl}
                        onClick = {() =>{this.setState({Openal:false,Openall:false})}}
                        />}
                    alert = {
                        <div>
                            <AlertMessage 
                                title = "Url is incorrect, please check url again!" 
                                OpenAlert ={this.state.Openal}
                                closeal = {this.closeal}
                            />
                            <AlertMessage 
                                title = {`URL ALREADY EXIST: "${this.state.urlInput}"`} 
                                OpenAlert ={this.state.Openall}
                                closeal = {this.closeal}
                            />
                        </div>  
                    }
                />}
            />}
        inputext = {this.handleChange}
        />
        )
    }
}