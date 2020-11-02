import React from 'react';
import { getListChannel } from '../../Serviece/Serviece';
import Dashboard from '../../Component/Dashboard/Appbar/Appbar';
import Listchannel from '../../Component/Users/Channel/listchannel';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
class Channel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            role: '',
            data: []
        }
    }

    async componentDidMount() {
        document.title = 'Epsilo | Channel';
        const token = sessionStorage.getItem('token');
        if(token === null)
            return this.props.history.push('/login');
        await getListChannel().then(res => {
            this.setState({data: res})
        })
    }
    render() {
        return (
            <Dashboard 
                table ={<Listchannel value={this.state.data}/>}
                breadcrumb = {<Breadcrumb title = "Configuration" title1="Channel"/>}
            />
        )
    }
}

export default Channel;