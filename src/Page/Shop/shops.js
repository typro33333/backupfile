import React from 'react';
import Dashboard from '../../Component/Dashboard/Appbar/Appbar';
import ListShop from '../../Component/Users/Shops/Shops/listshops';
import {check_role} from '../../Auth/author';
import Breadcrum from '../../Component/Breadcrumb/Breadcrumb';
import {list_shops} from '../../Serviece/Serviece';
import {currentData} from '../../Module/module_shop';
class Shops extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            data:[],
            role:'',
            noData:false,
            search:'',
            list:[],
            searchAvailable:false
        }
    }
    async componentDidMount(){
        document.title = 'Epsilo | Shop';
        await check_role().then(check_role => {
            if(check_role === null){
                this.props.history.push('/login');
            }
            this.setState({
                role:check_role
            });
        });
        const page = 0;
        const limit = 10;
        await list_shops(page,limit).then(res => {
            if(res.length > 0){
                for(var i = 0 ;i<res.length;i++){
                    if(res[i].sim_number === null)
                    res[i].sim_number = "Null"
                }
                this.setState({data: res});
            }
            else if(res.length === 0){
                this.setState({data:res,noData:true})
            }
        });
    }
    handleCheckChieldElement = (event) => {
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
        this.setState({arr_index:arr})
    }
    handleCheckChield = (event) =>{
        const arr = this.state.arr_indexx;
        console.log("trc: "+arr);
        if (event.target.checked === true){
            arr.splice(0,0,event.target.value);
        }
        else{
            var index = arr.indexOf(event.target.value);
            if (index !== -1) {
                arr.splice(index, 1);
            }
        }
        this.setState({arr_indexx:arr})
    }
    handleSearch = async (event) => {
        await this.setState({
            search:event.target.value,
            searchAvailable:true,
            list:currentData(this.state.data,this.state.search)
        });
    }
    render()
    {  
        const state = {
            data : this.state.data,
            role : this.state.role,
            noData:this.state.noData,
            search:this.state.search,
            list:this.state.list,
            searchAvailable:this.state.searchAvailable
        }
        const titlebreadcrum = {
            title:"Configuration",
            title1:"Shop"
        }
        const handle = {
            handleCheckChieldElement : this.handleCheckChieldElement,
            handleSearch: this.handleSearch
        }
        return(
            <Dashboard 
            table ={<ListShop {...handle} {...state}/>} 
            breadcrumb = {<Breadcrum {...titlebreadcrum}/>}/>
        )
    }
}
export default Shops