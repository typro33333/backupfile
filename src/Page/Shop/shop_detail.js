import React from 'react';
import Dashboard from '../../Component/Dashboard/Appbar/Appbar';
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import {check_role} from '../../Auth/author';
import Breadcrumdetail from '../../Component/Breadcrumb/Breadcrumb_details';
import ProfileShop from '../../Component/Users/Shops/ShopDetail/profile_shop';
import ListSim from '../../Component/Users/Shops/ShopDetail/listsim';
import FullWidthTabs from '../../Component/Users/Shops/ShopDetail/tabshop_detail';
import {DetailShop,SimofShop,ExecutorNotShop} from '../../Serviece/Serviece';

class ShopDetail extends React.Component{
    static propTypes = {
        match: PropTypes.object.isRequired
    };
    constructor(props){
        super(props);
        this.state ={
            openAdd: false,
            DetailShops:[],
            sim:[],
            role:'',
        }
    }
    async componentDidMount(){
        await check_role().then(check_role => {
            if(check_role === null){
                this.props.history.push('/login')
            }
            this.setState({
                role:check_role
            });
        });
        const {match} = this.props
        await DetailShop(match.params.id).then(respond =>{
            if(respond !== null){
                if(respond.sim_number === null){
                    respond.sim_number = "Trống"
                }
                this.setState({
                    DetailShops:[respond]
                });
            }
        });
        await SimofShop(match.params.id).then(res =>{
            if(res !== ''){
                this.setState({sim:res})
            }
        })
    }
    handleclickexecutor = (event) => {
        const arr = this.state.Clickexecutor;
        if (event.target.checked === true){
            arr.splice(0,0,event.target.value);
        }
        else{
            var index = arr.indexOf(event.target.value);
            if (index !== -1) {
                arr.splice(index, 1);
            }
        }
        this.setState({Clickexecutor:arr});
    }
    ClickOpenAdd = async() => {
        this.setState({
            openAdd:true
        });
        const {match} = this.props;
        await ExecutorNotShop(match.params.id)
        .then(respond =>{
            if(respond !== null){
                this.setState({ExeNotShop:respond})
            }
        });
    }
    render()
    {   
        console.log(this.state.sim)
        const {match} = this.props;
        const nameshop = match.params.slug;
        const Tabs = 
        <FullWidthTabs 
            profileShop = {<ProfileShop DetailShops = {this.state.DetailShops}/>} 
            simShop = {<ListSim sim = {this.state.sim}/>}
        />
        const titlebreadcrum = {
            title:"Configuration",
            title1:"Shops",
            title2:nameshop,
            href:'/shops'
        }
        return(
            <div>
                <Dashboard 
                table = {Tabs}
                breadcrumb = {<Breadcrumdetail {...titlebreadcrum}/>}
                />
            </div>
        )
    }
}
export default withRouter(ShopDetail);