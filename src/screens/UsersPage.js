import React, { useState, useEffect, useRef, useContext } from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { UserContext } from '../contexts/user/userReducer';
import * as ActionTypes from '../contexts/user/userActionTypes';
import userApi from '../api/users/userApi';
import UserItem from '../components/UserItem';
import LoadingScreen from '../components/LoadingScreen';
import SearchBar from '../components/SearchBar';
import * as utils from '../utils';
import * as styles from '../styles';
import _ from 'lodash';



const getAllUsersQuery = gql`
    ${utils.fragments.user}
    query {
        users:getAllUsers {
            ...userItemFields
        }
    }
`;

const UsersPage = ({history, client}) => {

    const ref = useRef();

    const { state, dispatch } = useContext(UserContext);
    
    async function search(e, searchVal, client) {
        let usersData;
        if(navigator.onLine && !searchVal) 
            usersData = await new userApi(client).getAllUsers().data.users;
        else if(!navigator.onLine && !searchVal)
            usersData = await new userApi(client).getAllUsersOffline().data.users;
        else if(navigator.onLine && searchVal) 
            usersData = await new userApi(client).searchAllUsers(searchVal).data.users;
        else if(!navigator.onLine && searchVal) 
            usersData = await new userApi(client).searchAllUsersOffline(searchVal).data.users;

        dispatch({type: ActionTypes.GET_USERS, users: usersData});

    }

    useEffect(() => {
        cancelAnimationFrame(ref.current);
    }, null);

    return (
        <Query
            query={getAllUsersQuery}
        >
            {response => {
                if(response.data && response.data.users) {
                    return (
                        <Container>
                           
                            <Segment>
                                <Header as="h2">
                                    Search Users
                                </Header>
                            </Segment>
                           
                            <SearchBar client={client} searchFunc={search} type="users"/>

                            <Segment className='white-subcontainer'>
                                <Container id="items-container">
                                    {
                                        state.users.length ?
                                        state.users.map(user => <UserItem key={user.id} {...user} history={history}/>)
                                        : response.data.users.map(user => <UserItem key={user.id} {...user} history={history}/>)
                                    }
                                </Container>
                            </Segment>
                            
                        </Container>
                    );
                }

                return <LoadingScreen />
            }}
        </Query>
    );
};

export default withRouter(UsersPage);