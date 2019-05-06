import gql from 'graphql-tag';

const getAllUsersQuery = gql`
    query {
        getAllUsers {
            id
            username
            avatar
            dateRegistered
        }
    }
`;

const getSingleUserQuery = gql`
    query GetSingleUser($userId: String!) {
        getUser(id: $userId) {
            id
            username
            avatar
            age
            dateRegistered
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
        //Set your fetch policy to network and cache to retrieve results from your api if the results are different update your cache as well.
        return this.client.query({ query: getAllUsersQuery, fetchPolicy: 'network-and-cache' });
    }

    getAllUsersOffline() {
        //IF the app is offline then query the data only using the cache.
        return this.client.query({ query: getAllUsersQuery, fetchPolicy: 'cache-only'});
    }

    getSingleUser(userId) {
        //Set your fetchPolicy to network and cache to retrieve result from your api if the results are different then update your cache as well.
        return this.client.query({ query: getSingleUserQuery, variables: { userId: userId }, fetchPolicy: 'network-and-cache'});
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