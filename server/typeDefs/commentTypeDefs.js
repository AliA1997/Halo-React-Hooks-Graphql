const  {gql}= require('apollo-server-express');

const typeDefs = gql`

    input CommentForm  {
        username: String
        avatar: String
        body: String
        dateCreated: Date
    }

    input UpdateCommentInput  {
        postId: String
        username: String
        avatar: String
        body: String
        dateCreated: Date
        dateUpdated: Date
    }

    type Comment {
        id: String
        postId: String
        username: String
        avatar: String
        body: String
        dateCreated: Date
        dateUpdated: Date
        deletedInd: Boolean
        permanentlyDeletedInd: Boolean
    }

    type Message {
        body: String 
    }

    # use the extend keyword to extend your graphql types it is useful primarily when using multiple type definitions.
    extend type Query {
        getComments(id: String): [Comment]
    }

    # use the extend keyword to extend your graphql types it is useful primarily when using multiple type definitions.
    extend type Mutation {
        createComment(commentForm: CommentForm, postId: String): Comment
        updateComment(commentId: String, commentForm: UpdateCommentInput): Comment
        deleteComment(commentId: String, postId: String, userId: String): Message
    }
`;

module.exports = typeDefs;