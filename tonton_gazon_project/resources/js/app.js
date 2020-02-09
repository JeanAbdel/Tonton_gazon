require('./bootstrap');
require('./script/form-animation');

import $ from 'jquery';

import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {PrivateRoute} from './components/helpers/PrivateRoute'

//Routes
// import Index from './components/index'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Profil from './components/auth/profil'
import Home from './components/home'
//import Forgot from './components/auth/forgot'
//import Reset from './components/auth/reset'

import Error404 from './components/error404'
import Advert from './components/adverts/Advert'
import Garden from './components/garden/Garden'

import Legal from './components/Legal'
import Cgu from './components/Cgu'
import Aide from './components/Aide'
import Contact from './components/Contact'
import Cookies from './components/Cookies'

import Slick from './vendors/slick';
import Script from './script/script';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/mon-profil' component={Profil}/>
            <Route path='/garden' component={Garden}/>
            <Route path='/mentions-legales' component={Legal}/>
            <Route path='/cgu' component={Cgu}/>
            <Route path='/aide' component={Aide}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/politique-cookies' component={Cookies}/>
            {/* <PrivateRoute exact path='/home' component={Home}/> 
            <Route path='/forgotpassword' component={Forgot}/>
            <Route path='/resetPassword' component={Reset}/>*/}

            <Route path='/adverts' component={Advert}/>
          {/*  <Route path='/password/reset/:token' component={Reset}/> */}

            <Route exact={false} component={Error404}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
);
