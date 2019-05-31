const gql = require('graphql-tag');

const typeDefs = gql`
    # Interfaces----------------------------------------------
    interface IUser {
        id: String
        username: String
        avatar: String
        dateRegistered: Date
    }

    interface ISocialMedia {
        facebook: String
        instagram: String
        linkedin: String
        twitter: String
    }

    # NOTE: When dealing with input types cannot define interfaces so just use composition.


    # Input Types---------------------------------------------------------
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
        age: Int
        dateRegistered: Date
        dateUpdated: String
    }

    input UpdateSocialMedia {
        type: String
        value: String
    }

    type UserItem implements IUser { 
        id: String!
        username: String!
        avatar: String!
        dateRegistered: Date
    }

    type SocialMedia implements ISocialMedia {
        facebook: String
        instagram: String
        linkedin: String
        twitter: String
    }

    type User {
        id: String
        username: String
        avatar: String
        password: String
        age: Int
        friends: [String]
        socialMediaInfo: SocialMedia
        dateRegistered: Date
        dateUpdated: String
        deletedInd: Boolean
        permanentlyDeletedInd: Boolean
    }

    # use the extend keyword for when merge multiple typeDefinitions
    extend type Query {
        getAllUsers: [UserItem]
        searchUsers(searchVal: String): [UserItem]
        getUser(id: String): User
    }
    
    # use the extend keyword for when merging multiple typeDefinitions
    extend type Mutation {
        login(loginForm: LoginInput!): User
        register(registerForm: RegisterInput!): User
        logout: User
        # Admin related fields
        updateUser(updateUserForm: UpdateUserInput!, userId: String!): User
        # Update Social Media
        updateSocialMedia(socialMediaForm: UpdateSocialMedia, userId: String!, socialMediaId: String): SocialMedia
        deleteUser(userId: String!): Message
    }
`;

module.exports = typeDefs;
