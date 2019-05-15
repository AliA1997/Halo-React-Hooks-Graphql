import gql from 'graphql-tag';
import * as utils from '../../utils';

const getAllUsersQuery = gql`
    ${utils.fragments.user}
    query {
        getAllUsers {
            ...userItemFields
        }
    }
`;

const searchUsersQuery = gql`
    ${utils.fragments.user}
    query SearchUsers($searchVal: String) {
        searchUsers(searchVal: $searchVal) {
            ...userItemFields
        }
    }
`;

const getSingleUserQuery = gql`
    ${utils.fragments.user}
    query GetSingleUser($userId: String) {
        user:getUser(id: $userId) {
            ...userItemFields
            age
            deletedInd
            permanentlyDeletedInd
        }
    }
`;

const loginMutation = gql`
    mutation Login($loginForm: LoginInput!) {
        login(loginForm: $loginForm) {
            username
            avatar
            age
            dateRegistered
        }
    }
`;

const registerMutation = gql`
    mutation Register($registerForm: RegisterInput!) {
        register(registerForm: $registerForm) {
            username
            avatar
            age
            dateRegistered
        }
    }
`;

const logoutMutation = gql`
    mutation {
        logout {
            username
        }
    }
`;

class UserApi {
    constructor(client) {
        this.client = client;
    }

    getAllUsers() {
        //Set your fetch policy to cache and network to retrieve results from your api if the results are different update your cache as well.
        return this.client.query({ query: getAllUsersQuery, fetchPolicy: 'cache-and-network' });
    }

    getAllUsersOffline() {
        //IF the app is offline then query the data only using the cache.
        return this.client.query({ query: getAllUsersQuery, fetchPolicy: 'cache-only'});
    }
    
    searchAllUsers(searchVal) {
        return this.client.watchQuery({ query: searchUsersQuery, variables: { searchVal }, fetchPolicy: 'cache-and-network'});
    }

    searchAllUsersOffline(searchVal) {
        return this.client.query({ query: searchUsersQuery, variables: { searchVal }, fetchPolicy: 'cache-only'});
    }

    getSingleUser(userId) {
        //Set your fetchPolicy to cache and network to retrieve result from your api if the results are different then update your cache as well.
        return this.client.watchQuery({ query: getSingleUserQuery, variables: { userId: userId }, fetchPolicy: 'cache-and-network'});
    }

    getSingleUserOffline(userId) {
        //IF the app is offline then query the data only using the cache.
        return this.client.query({ query: getSingleUserQuery, variables: { userId: userId }, fetchPolicy: 'cache-only'});
    }

    login(loginForm){
        return this.client.mutate({mutation: loginMutation, variables: { loginForm: loginForm }});
    }
    
    register(registerForm) {
        return this.client.mutate({mutation: registerMutation, variables: { registerForm: registerForm }});
    }

    logout() {
        return this.client.mutate({mutation: logoutMutation});
    }
}

export default UserApi;