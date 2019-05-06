import React, { useState, useEffect } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import * as utils from '../utils';
import userApi from '../api/users/userApi';
import LoadingScreen from '../components/LoadingScreen';

const UsersPage = (props) => {

    const [users, setUsers] = useState([]);

    async function getUsers(client) {
        let usersData;
        if(navigator.onLine) 
            usersData = new userApi(client).getAllUsers().data.getAllUsers;
        else 
            usersData = new userApi(client).getAllUsersOffline().data.getAllUsers;

        setUsers(usersData);
    }

    return (
        <ApolloConsumer>
            {client => {
                if(client) {
                    getUsers(client);
                    console.log('users--------', users);
                    return (
                        <div>
                            Users
                        </div>
                    )
                }

                return <LoadingScreen />;
            }}
        </ApolloConsumer>
    );
};

export default UsersPage;