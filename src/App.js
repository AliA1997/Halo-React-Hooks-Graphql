import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import AuthenticatedWrapper from './AuthenticatedWrapper';
import * as utils from './utils';
import * as styles from './styles';

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
            <div style={styles.container}>
                <ToastContainer />
                <AuthenticatedWrapper />
            </div>
        );
    }
}