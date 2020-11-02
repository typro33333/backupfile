import React from 'react';
import Dashboard from '../../Component/Dashboard/Appbar/Appbar';
import ListDetail from '../../Component/Users/Sim/listitems_detail';
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import {check_role} from '../../Auth/author';
import Breadcrumdetail from '../../Component/Breadcrumb/Breadcrumb_details';
import Tabs from '../../Component/Tabs/tabs';
import ListURLOFSIM from '../../Component/Users/Sim/url_sim';
import {searchurl} from '../../Module/module_sim';
import {getAllRawmessage,getAllurlofsim,getAllurlNotInsim,postUrltosim} from '../../Serviece/Serviece';
class SimDetail extends React.Component{
    static propTypes = {
        match: PropTypes.object.isRequired
    };
    constructor(props){
        super(props);
        this.state ={
            data:[],
            data_url:[],
            data_url_not_in_sim:[],
            openDialog:false,
            arr_index:[],
            funcSearch:false,
            input:'',
            list:[],
            arr_indexx:[],
            page:0,
            rowsPerPage:10,
        }
    }
    async componentDidMount(){
        const {match} = this.props;
        await check_role().then(check_role => {
            if(check_role === null){
                this.props.history.push('/login')
            }
            this.setState({
                role:check_role
            });
        });
        await getAllRawmessage(match.params.id).then(res =>{
            if(res !=='')
                this.setState({data:res})
        });
        await getAllurlofsim(match.params.id).then(res =>{
            if(res !==''){
                res.forEach(element => {
                    element.active = false
                });
                this.setState({data_url:res})
            }
        })
    }
    handleaddurl = async() => {
        await this.setState({openDialog:true});
        const {match} = this.props;
        await getAllurlNotInsim(match.params.id).then(res =>{
            if(res !== '')
                this.setState({data_url_not_in_sim:res})
        })
    }
    onClosediglog = () => {
        this.setState({openDialog:false,openAddTags:false})
    }
    btnCofirm = async() => {
        var {match} = this.props;
        var newurl = {
            "sim":[match.params.id],
            "url":this.state.arr_index
        }
        await postUrltosim(newurl).then(async res =>{
            if(res){
                await getAllurlofsim(match.params.id).then(res =>{
                    if(res !==''){
                        res.forEach(element => {
                            element.active = false
                        });
                        this.setState({data_url:res})
                    }
                })
                this.setState({openDialog:false,arr_index:[]})
            }
        })
    }
    handleCheck = (event) => {
        const arr = this.state.arr_index;
        if (event.target.checked === true){
            arr.splice(0,0,event.target.value);
        }
        else{
            var index = arr.indexOf(event.target.value);
            if (index !== -1) {
                arr.splice(index, 1);
            }
        }
        this.setState({arr_index:arr});
    }
    text = async(event) => {
        await this.setState({list:searchurl(this.state.data_url,event.target.value),funcSearch:true});
    }
    handleCheckbox = async(event) => {
        const arr = this.state.arr_indexx;
        var index = arr.indexOf(event.target.value);
        var i = event.target.name;
        const arrdata = this.state.data_url;
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
    handleChangePage = (event,newPage) =>{
        this.setState({page:newPage})
    }
    handleChangeRowsPerPage = (event) =>{
        this.setState({rowsPerPage:parseInt(event.target.value,10)});
        this.setState({page:0});
    }
    handledelete = () => {
        
    }
    render()
    { 
        const {match} = this.props;
        const number = match.params.id;
        const titleBreadCrum = {
            title:"Home",
            title1:"Sim",
            title2:number,
            href:"/sim"
        }
        const state = {
            data:this.state.data,
            data_url:this.state.data_url,
            openDialog:this.state.openDialog,
            data_url_not_in_sim:this.state.data_url_not_in_sim,
            list:this.state.list,
            funcSearch:this.state.funcSearch,
            rowsPerPage:this.state.rowsPerPage,
            page:this.state.page,
            arr_indexx:this.state.arr_indexx,
            tags:this.state.tags,
        }
        const handle = {
            handleaddurl:this.handleaddurl,
            onClosediglog:this.onClosediglog,
            btnCofirm:this.btnCofirm,
            handleCheck:this.handleCheck,
            text:this.text,
            handleCboxSearch : this.handleCboxSearch,
            handleCheckbox :this.handleCheckbox,
            handleChangePage:this.handleChangePage,
            handleChangeRowsPerPage:this.handleChangeRowsPerPage,
            handledelete:this.handledelete,
        }
        const props = {
            item_1: <ListDetail number = {number} {...state} {...handle}/>,
            Namelabel: "Raw Message",
            Namelabel_1: "Sim Function",
            item_2: <ListURLOFSIM {...state} {...handle}/>
        }
        return(
                <Dashboard 
                table =  {<Tabs {...props}/>}
                breadcrumb = {<Breadcrumdetail {...titleBreadCrum}/>}/> 
        )
    }
}
export default withRouter(SimDetail);