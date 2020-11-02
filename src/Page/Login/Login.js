import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from '../../Component/Login/Main';
import Footer from '../../Component/Login/Footer';
import './login.css';
import {login} from '../../Serviece/Serviece';
import Popup from '../../Component/Popup/popup';
import {check_role} from '../../Auth/author';
export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isNotified : false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    async componentDidMount(){
        document.title = 'Login'; 
        await check_role().then(check_role =>{
            if(check_role === null){
                return
            }
            return this.props.history.push('/sim');
        })
    }

    Onchange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    async onSubmit(event){
        event.preventDefault();
        const user = {
            username: this.state.email,
            password: this.state.password
        }
        await login(JSON.stringify(user)).then(res =>{
                if(sessionStorage.getItem('token') === res){
                    sessionStorage.setItem('user',this.state.email);
                    return this.props.history.push('/sim')
                }else{
                    this.setState({
                        isNotified : true
                    });
                };
        });
    }
    onClose = () =>{
        this.setState({
            isNotified : false
        })
    }

    render(){
            const {isNotified} = this.state;
            const elemt = isNotified ? <Popup onClose = {this.onClose}
                                              title = "User Name or Password incorrect, please enter again."
            /> : '';
        return (
                <div className = "background">
                    <CssBaseline />
                    <Main   onSubmit = {this.onSubmit}
                            Onchange = {this.Onchange}
                    />
                    <Footer />
                    {elemt}
                </div>
        );
    }
}



  