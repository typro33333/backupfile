import React, {Component} from 'react';
import {Route, Switch,Redirect} from 'react-router-dom';
import Login from '../Page/Login/Login';
import Sim from '../Page/Sim/sim';
import SimDetail from '../Page/Sim/detail';
import Users from '../Page/Users/users';
import UsersDetail from '../Page/Users/users_detail';
import Channel from '../Page/Channel/channel';
import Shops from '../Page/Shop/shops';
import ShopDetail from '../Page/Shop/shop_detail'
import Countries from '../Page/Country/countries';
import Country_details from "../Page/Country/country_details";
import ChannelDetails from "../Page/Channel/channel_detail";
import Url from "../Page/Url/url";
class RouterURL extends Component {
	render() {
        return(     
        <Switch>
            <Redirect path = '/' to ='/login' exact/>
            <Route  path="/login" component={Login} />
            
            <Route exact path ="/sim" component = {Sim} />
            <Route path ="/sim/:id" component = {SimDetail} />
            
            <Route exact path ="/user" component = {Users} />
            <Route path ="/user/:id/:slug" component = {UsersDetail} />

            <Route exact path = "/channel" component ={Channel}/>
            <Route path ="/channel/:details/:id" component = {ChannelDetails}/>

            <Route exact path = "/shops" component = {Shops} />
            <Route path = "/shops/:id/:slug" component ={ShopDetail} />

            <Route exact path = "/countries" component = {Countries} />
            <Route path = "/countries/:id/:slug" component ={Country_details} />

            <Route exact path = "/url" component = {Url} />
        </Switch>
        )
    }
}
export default RouterURL;