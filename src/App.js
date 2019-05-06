import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import AuthenticatedWrapper from './AuthenticatedWrapper';
import * as utils from './utils';

export default class App extends Component {
    // componentDidMount() {
    //     if(this.props.hasOwnProperty('currentUser') && this.props.currentUser) {
    //         currentUser.Role = utils.Roles.LoggedInUser;
    //     } else {
    //         currentUser.Role = utils.Roles.Guest;
    //     }
    // }
    render() {
        return (
            <div className="container">
                <ToastContainer />
                <AuthenticatedWrapper />
            </div>
        );
    }
}