import React from 'react';
import Dashboard from '../../Component/Dashboard/Appbar/Appbar';
import BreadcrumbUser from '../../Component/Breadcrumb/Breadcrumb_details';
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import Tabbar from '../../Component/Users/Users/User_detail/tabs';
import {check_role} from '../../Auth/author';
import {user_profile,user_shops} from '../../Serviece/Serviece';

class User_detail extends React.Component{
    static propTypes = {
        match: PropTypes.object.isRequired
    };
    constructor(props){
        super(props);
        this.state ={
            role:'',
            data_profile:[],
            data:[],
            noData:false
        }
    }
    async componentDidMount(){
        await check_role().then(check_role =>{
            if(check_role === null){
                this.props.history.push('/login')
            }
            this.setState({
                role:check_role
            });
        });
        const {match} = this.props;
        await user_profile(match.params.id).then(profile =>{
            if(profile !== null){
                this.setState({
                    data_profile:profile
                });
            }
        });
        await user_shops(match.params.id).then(shops =>{
            console.log(shops)
            if(!shops){
                this.setState({
                    data:false
                })
            }
            else if (shops !== null){
                for(var i = 0; i<shops.length; i++){
                    if(shops[i].sim_number === null){
                        shops[i].sim_number = "Trống"
                    }
                }
                this.setState({
                    data:shops
                })
            }
        });
    }
    render()
    {  
        console.log(this.state.data)
        const {match} = this.props;
        const state ={
            firstname: this.state.data_profile.firstName,
            lastname: this.state.data_profile.lastName,
            lastlogin: this.state.data_profile.last_login,
            email : match.params.slug,
            role : this.state.role,
            data : this.state.data,
            noData: this.state.noData
        }
        const titleBreadCrum = {
            title:"Configuration",
            title1:"User",
            title2:"Detail",
            href:"/user"
        }
        return(
            <Dashboard  
            breadcrumb ={ <BreadcrumbUser {...titleBreadCrum}/>}
            table ={<Tabbar {...state} handleCheckbox = {this.handleCheckbox}/>}
            />
        )
    }
}

export default withRouter(User_detail);