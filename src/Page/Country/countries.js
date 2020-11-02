import React from 'react';
import { getAllCountries } from '../../Serviece/Serviece';
import Dashboard from '../../Component/Dashboard/Appbar/Appbar';
import ListCountries from '../../Component/Users/Country/Countries';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
class Country extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    async componentDidMount() {
        document.title = 'Epsilo | Country';
        const token = sessionStorage.getItem('token');
        if(token === null)
            return this.props.history.push('/login');
        await getAllCountries().then(res => {this.setState({data: res})})
    }
    render() {
        return (
                <Dashboard 
                table={<ListCountries value={this.state.data ? this.state.data : []} />}
                breadcrumb = {<Breadcrumb title = "Configuration" title1="Country" />}
                />
        )
    }

    
}
export default Country;