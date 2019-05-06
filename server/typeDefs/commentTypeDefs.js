const  {gql}= require('apollo-server-express');

const typeDefs = gql`

    input CommentForm  {
        username: String
        body: String
        dateCreated: Date
    }

    input UpdateCommentInput  {
        username: String
        body: String
        dateCreated: Date
        dateUpdated: Date
    }

    type Comment {
        id: String
        postId: String
        username: String
        body: String
        dateCreated: Date
        dateUpdated: Date
        deletedInd: Boolean
        permanentlyDeletedInd: Boolean
    }

    # use the extend keyword to extend your graphql types it is useful primarily when using multiple type definitions.
    extend type Query {
        getComments(id: String): [Comment]
    }

    # use the extend keyword to extend your graphql types it is useful primarily when using multiple type definitions.
    extend type Mutation {
        createComment(commentForm: CommentForm): [Comment]
        updateComment(commentId: String, commentForm: UpdateCommentInput): [Comment]
        deleteComment(postId: String, commentId: String, userId: String): [Comment]
    }
`;

module.exports = typeDefs;