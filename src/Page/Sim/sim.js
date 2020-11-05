import React from 'react';
import Dashboard from '../../Component/Dashboard/Appbar/Appbar';
import Listitems from '../../Component/Users/Sim/listitems_sim';
import Breadcrum from '../../Component/Breadcrumb/Breadcrumb';
import {getAllsim,getRefresh,getBalance,postcheckbalance,all_tag_of_sim} from '../../Serviece/Serviece';
import {currentData} from '../../Module/module_sim';

export default class Sim extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            search:"",
            changeData:false,
            list:[], // data
            data:[],
            expireDateDefault:"All",
            expireLabel:[
                {label:"All"},
                {label:"Good"},
                {label:"Warning"},
                {label:"Danger"},
            ],
            statusDefault:'All',
            statusLabel:[
                {label:"All"},
                {label:"Online"},
                {label:"Offline"}
            ],
            currentfillter:[],
            disableBtn:false,
            disableBtnBalance:false,
            dem:'',
            dem1:'',
            arr_index:[],
            page:0,
            rowsPerPage:5,
            typesearch:[
                {label:'Phone Number'},
                {label:'#Tags'}
            ],
            searchDefault:'Phone Number',
            listPhone:[]

        }
        this.reactTags = React.createRef()
    }
    async componentDidMount(){
        document.title = 'Epsilo | Sim';
        const token = sessionStorage.getItem('token');
        if(token === null){
            return this.props.history.push('/login')
        }
        await getAllsim().then(async res => {
            if(res !== ''){
                res.forEach(element => {
                    element.active = false
                });
                var dem = 0;
                var dem1 =0;
                for(var i = 0; i < res.length;i++){
                    if(res[i].status === false)
                        dem += 1;
                }
                for(var j = 0; j<res.length;j++){
                    if(res[j].check === 'checking')
                        dem1 += 1;
                }
                for(i = 0; i < res.length; i++){
                    if(res[i].sim_number === "False")
                        res.splice(i,1)
                }
                if(res.length === dem || res.length === dem1){
                    this.setState({disableBtn:true,disableBtnBalance:true})
                }
                for( i = 0; i<res.length; i++){
                    this.state.listPhone.push(res[i].sim_number)
                }
                const arr = await all_tag_of_sim(this.state.listPhone).then(res =>{
                    var arr =[];
                    for(var i = 0;i<res.length;i++){
                        var tag ='';
                        var sim_number = '';
                        for(var j = 0;j<res[i].length;j++){
                            tag = (tag+" #"+res[i][j].title);
                            if(res[i][0].sim_number === undefined || res[i][0].sim_number === null){
                                
                            }else{
                                sim_number = res[i][0].sim_number;
                            }
                        }
                        arr.push({tag,sim_number});
                    }
                    return arr;
                })
                for(i = 0; i<res.length;i++){
                    if(res[i].sim_number === arr[i].sim_number){
                        if(arr[i].tag === ' #undefined'){
                            res[i].tag = ''
                        }
                        else 
                            res[i].tag = arr[i].tag
                    }
                }
                this.setState({
                    data:res,
                    dem:dem,
                    dem1:dem1
                })
                return;
            }else if (res === 401){
                return this.props.history.push('/login')
            }
        });
        /*for(var i = 0; i<this.state.data.length; i++){
            this.state.listPhone.push(this.state.data[i].sim_number)
        }
        await all_tag_of_sim(this.state.listPhone)
        .then(res => {
            var arr =[];
            const {data} = this.state;
            for(var i = 0;i<res.length;i++){
                var tag ='';
                var sim_number = '';
                for(var j = 0;j<res[i].length;j++){
                    tag = (tag+" #"+res[i][j].title);
                    if(res[i][0].sim_number === undefined || res[i][0].sim_number === null){
                        
                    }else{
                        sim_number = res[i][0].sim_number;
                    }
                }
                arr.push({tag,sim_number});
            }
            for(i = 0; i<data.length;i++){
                if(data[i].sim_number === arr[i].sim_number){
                    if(arr[i].tag === '#undefined'){
                        data[i].tag = ''
                    }
                    else 
                        data[i].tag = arr[i].tag
                }
            }
            this.setState({data:data})
        })*/
        setInterval(async() => {
            await getAllsim().then(async res => {
                if(res !== ''){
                    var dem = 0;
                    var dem1 =0;
                    res.forEach(element => {
                        element.active = false
                    });
                    for(var k = 0; k < res.length;k++){
                        for(var l = 0; l < this.state.arr_index.length;l++){
                            if(res[k].sim_number === this.state.arr_index[l])
                                res[k].active = true
                        }
                    }
                    for(var i = 0; i < res.length;i++){
                        if(res[i].status === false){
                            dem += 1;
                        }
                    }
                    for(var j = 0; j<res.length;j++){
                        if(res[j].check === 'checking'){
                            dem1 += 1;
                        }
                    }
                    if(res.length === dem || res.length === dem1){
                        this.setState({
                            disableBtn:true,
                            disableBtnBalance:true,
                        })
                    }
                    const arr = await all_tag_of_sim(this.state.listPhone).then(res =>{
                        var arr =[];
                        for(var i = 0;i<res.length;i++){
                            var tag ='';
                            var sim_number = '';
                            for(var j = 0;j<res[i].length;j++){
                                tag = (tag+" #"+res[i][j].title);
                                if(res[i][0].sim_number === undefined || res[i][0].sim_number === null){
                                    
                                }else{
                                    sim_number = res[i][0].sim_number;
                                }
                            }
                            arr.push({tag,sim_number});
                        }
                        return arr;
                    })
                    for(i = 0; i<res.length;i++){
                        if(res[i].sim_number === arr[i].sim_number){
                            if(arr[i].tag === ' #undefined'){
                                res[i].tag = ''
                            }
                            else 
                                res[i].tag = arr[i].tag
                        }
                    }
                    this.setState({
                        data:res,
                        dataLocal:res,
                        dem:dem,
                        dem1:dem1,
                    });
        await all_tag_of_sim(this.state.listPhone).then(res => {
            var arr =[];
            const {data} = this.state;
            for(var i = 0;i<res.length;i++){
                var tag ='';
                var sim_number = '';
                for(var j = 0;j<res[i].length;j++){
                    tag = (tag+" #"+res[i][j].title);
                    if(res[i][0].sim_number === undefined || res[i][0].sim_number === null){
                        
                    }else{
                        sim_number = res[i][0].sim_number;
                    }
                }
                arr.push({tag,sim_number});
            }
            for(i = 0; i<data.length;i++){
                if(data[i].sim_number === arr[i].sim_number){
                    if(arr[i].tag === ' #undefined'){
                        data[i].tag = ''
                    }
                    else 
                        data[i].tag = arr[i].tag
                }
            }
            this.setState({data:data})
        })
                }
                return;
            })
        },10000);
    }
    handleSearch = async (event) =>{
        await this.setState({
            search:event.target.value,
            changeData:true
        });
        this.setState({list:currentData(this.state.data,this.state.search,this.state.statusDefault,this.state.expireDateDefault,this.state.searchDefault)});
    }
    handleChangeStatus = async(event) => {
        await this.setState({statusDefault:event.target.value,changeData:true});
        this.setState({list:currentData(this.state.data,this.state.search,this.state.statusDefault,this.state.expireDateDefault,this.state.searchDefault)});
    }
    handleChangeExpire = async (event) => {
        await this.setState({expireDateDefault:event.target.value,changeData:true});
        this.setState({list:currentData(this.state.data,this.state.search,this.state.statusDefault,this.state.expireDateDefault,this.state.searchDefault)});
    }
    handleRefesh = async () => {
        await this.setState({disableBtn:true});
        await getRefresh().then(async res => {
            if(res)
                await getAllsim().then(res =>{
                    if(res !=='')
                        this.setState({data:res,disableBtn:false,disableBtnBalance:false})
                });
        });
    };
    handleBalance = async () => {
        await this.setState({disableBtnBalance:true,disableBtn:true});
        await getBalance().then(async res => {
            if(res)
                await getAllsim().then(res =>{
                    if(res !==''){
                        this.setState({data:res,disableBtn:false,disableBtnBalance:false});
                    }
                });
        });
    };
    handleCbox = (event) => {
        var arr = this.state.arr_index;
        var i = event.target.name;
        var index = arr.indexOf(event.target.value);
        const value = event.target.value;
        var {data} = this.state;
        if(event.target.checked === true){
            data[Number(this.state.page) * Number(this.state.rowsPerPage) + Number(i)].active = true;
            this.setState({list:data});
            arr.push(value);
            this.setState({changeData:true});
        }
        else if(event.target.checked === false){
            data[Number(this.state.page) * Number(this.state.rowsPerPage) + Number(i)].active = false;
            this.setState({list:data});
            arr.splice(index, 1);
            this.setState({changeData:true});
        }
        this.setState({arr_index:arr});
    }
    handleChangePage = (event,newPage) =>{
        this.setState({page:newPage})
    }
    handleChangeRowsPerPage = (event) =>{
        this.setState({rowsPerPage:parseInt(event.target.value,10)});
        this.setState({page:0});
    }
    handleCboxAll = (event) => {
        var {data,arr_index} = this.state;
        if(event.target.checked === true){
            for(var i = 0; i < data.length; i++){
                data[i].active = true;
                if(data[i].status === true)
                arr_index.push(data[i].sim_number);
            }
        this.setState({list:data,data:data})
        }
        else if(event.target.checked === false){
            for( i = 0; i<data.length;i++){
                data[i].active = false
            }
        this.setState({list:data,arr_index:[],data:data})
        }
    }
    checkbanlancedd =async () => {
        const {arr_index} =this.state;
        await postcheckbalance(arr_index).then(res => {
            if(res)
                return true;
        })
    }
    handleChangeTypeSearch = async (event) => {
        await this.setState({searchDefault:event.target.value});
    }
    handleAddTag = async () => {
        
    }
    render()
    {  
        const state = {
            data : this.state.data,
            list : this.state.list,
            changeData : this.state.changeData,
            statusLabel: this.state.statusLabel,
            statusDefault:  this.state.statusDefault,
            expireDateDefault: this.state.expireDateDefault,
            expireLabel:this.state.expireLabel,
            disableBtn: this.state.disableBtn,
            disableBtnBalance:this.state.disableBtnBalance,
            tag:this.state.tags,
            page:this.state.page,
            rowsPerPage:this.state.rowsPerPage,
            arr_index:this.state.arr_index,
            typesearch:this.state.typesearch,
            searchDefault:this.state.searchDefault
        }
        const titlebreadcrum = {
            title:"Home",
            title1:"Sim"
        }
        const handle = {
            text : this.handleSearch,
            handleChangeStatus : this.handleChangeStatus,
            handleChangeExpire : this.handleChangeExpire,
            handleRefesh: this.handleRefesh,
            handleBalance:this.handleBalance,
            handleCbox:this.handleCbox,
            handleChangePage:this.handleChangePage,
            handleCboxAll:this.handleCboxAll,
            checkbanlancedd:this.checkbanlancedd,
            handleChangeTypeSearch:this.handleChangeTypeSearch,
            handleAddTag:this.handleAddTag,
        }
        let listitems = <Listitems {...handle} {...state}/>
        return(
            <div>
                <Dashboard  
                table = {listitems} 
                breadcrumb = {<Breadcrum {...titlebreadcrum}/>}
                />
            </div>
        )
    }
}
