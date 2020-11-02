import React from 'react';
import Dashboard from '../../Component/Dashboard/Appbar/Appbar';
import ListUser from '../../Component/Users/Users/listitems_executor';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import {withRouter} from 'react-router-dom';
import {check_role} from '../../Auth/author';
import {Alluser} from '../../Serviece/Serviece';
class Users extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            data:[],
            role:'',
        }
    }
    async componentDidMount(){
        document.title = 'Epsilo | User';
        await check_role().then(check_role => {
            if(check_role === null){
                this.props.history.push('/login')
            }
            this.setState({
                role:check_role
            });
        });
        await Alluser().then(newdata => {
            if(newdata !== null){
                for(var i = 0; i < newdata.length; i++){
                    if(newdata[i].last_login === null || newdata[i].last_login === ''){
                        newdata[i].last_login = 'Not have Login'
                    }
                };
                this.setState({
                    data: newdata
                });
            }
        });
    }
    render()
    {
        const titlebreadcrum = {
            title:"Home",
            title1:"User"
        }
        return(
            <div>
                <Dashboard  
                table ={
                    <ListUser 
                    data = {this.state.data}
                    role = {this.state.role}
                    />}
                breadcrumb ={<Breadcrumb {...titlebreadcrum}/>}/>
            </div>
        )
    }
}
export default withRouter(Users);