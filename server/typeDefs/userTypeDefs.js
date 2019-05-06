const gql = require('graphql-tag');

const typeDefs = gql`

    input LoginInput {
        username: String!
        password: String!
    }

    input RegisterInput {
        username: String!
        password: String!
        avatar: String!
        age: Int!
        dateRegistered: Date!
    }

    input UpdateUserInput {
        username: String
        avatar: String
        age: String
        dateUpdated: String
    }

    interface IUser {
        id: String!
        username: String!
        avatar: String!
        dateRegistered: Date
    }
    
    type UserItem implements IUser { 
        id: String!
        username: String!
        avatar: String!
        dateRegistered: Date
    }

    type User implements IUser {
        id: String!
        username: String!
        avatar: String!
        password: String!
        age: Int!
        dateRegistered: Date!
        deletedInd: Boolean!
        permanentlyDeletedInd: Boolean!
    }

    # use the extend keyword for when merge multiple typeDefinitions
    extend type Query {
        getAllUsers: [UserItem]
        getUser(id: String!): User
    }
    
    # use the extend keyword for when merging multiple typeDefinitions
    extend type Mutation {
        login(loginForm: LoginInput!): User
        register(registerForm: RegisterInput!): User
        logout: User
        # Admin related fields
        updateUser(updateUserForm: UpdateUserInput!, userId: String!): User
        deleteUser(userId: String!): User
    }
`;

module.exports = typeDefs;
