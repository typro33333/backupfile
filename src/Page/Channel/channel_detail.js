import React, { Component } from 'react';
import { withRouter } from "react-router";
import { check_role } from '../../Auth/author'; 
import { getShopsOfChannel } from "../../Serviece/Serviece";
import Dashboard from "../../Component/Dashboard/Appbar/Appbar";
import Channeldetails from "../../Component/Users/Channel/Channeldetails.js/Tab";
import Breadcrumbdetails from "../../Component/Breadcrumb/Breadcrumb_details";

class Channel_Details extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }   
    }
    async componentDidMount() {
        const { match } = this.props;
        await check_role().then(check_role => {
            if(check_role === null){
                this.props.history.push('/login')
            }
            this.setState({role:check_role});
        });
        const id = match.params.id
        getShopsOfChannel(id).then(res => {
         this.setState({shops: res});
        });
    }
    render() {
        const { match } = this.props;
        const name = match.params.details;
        const props = {
            href: "/channel",
            title:'Configuration',
            title1: "Channel",
            title2: name
        }
        return (
            <Dashboard 
            table={<Channeldetails 
            executor={this.state.executor}
            shops={this.state.shops}
            title={name}/>}
            breadcrumb ={<Breadcrumbdetails {...props}/>}
            />
        )
    }
}

export default withRouter(Channel_Details);