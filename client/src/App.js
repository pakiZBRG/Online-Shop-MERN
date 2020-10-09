import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Activation from './components/Activation';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
/* PROJECT */
import UploadProduct from './travel-project/UploadProduct';

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <Route path='/users/activate/:token' component={Activation}/>
                <Route path='/forgotpassword' component={ForgotPassword}/>
                <Route path='/resetpassword/:token' component={ResetPassword}/>
                {/* PROJECT */}
                <Route path='/product/upload' component={UploadProduct}/>
            </Switch>
        </BrowserRouter>
    )
}
