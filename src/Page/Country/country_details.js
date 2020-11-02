import React, { Component } from 'react';
import { withRouter } from "react-router";
import { check_role } from '../../Auth/author';
import { getCountryDetails } from '../../Serviece/Serviece';
import { getShopsOfCountry } from "../../Serviece/Serviece";
import Dashboard from '../../Component/Dashboard/Appbar/Appbar';
import Tab from "../../Component/Users/Country/CountryDetails/Tab"
import Breadcrumbdetails from "../../Component/Breadcrumb/Breadcrumb_details";

class Channel_Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }   
    }
    async componentDidMount() {
        const { match } = this.props;
        const id = match.params.id
        await check_role().then(check_role => {
            if(check_role === null)
                this.props.history.push('/login')
            this.setState({role:check_role});
        });
        getCountryDetails(id).then(res => {this.setState({information: res})})
        getShopsOfCountry(id).then(res => {this.setState({ shops: res})})
       
    }

    render() {
        const { match } = this.props;
        const name = match.params.slug
        const props = {
            href: "/countries",
            title:"Configuration",
            title1: "Country",
            title2: name
        }
        return (
            <Dashboard 
            breadcrumb ={<Breadcrumbdetails {...props}/>}
            table = {
            <Tab 
                information={this.state.information} shops={this.state.shops} title={name}/>} 
            />
        )
    }
}

export default withRouter(Channel_Details);