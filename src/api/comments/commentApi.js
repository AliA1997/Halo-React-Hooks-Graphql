import gql from 'graphql-tag';
import * as utils from '../../utils';

const createCommentMutation = gql`
    mutation CreateComment($commentForm: CommentForm) {
        createComment(commentForm: $commentForm) {
            username
            avatar
            body
        }
    }
`;

const updateCommentMutation = gql`
    mutation UpdateComment($commentId: String, $commentForm: UpdateCommentInput) {
        updateComment(commentId: $commentId, commentForm: $commentForm) {
            username
            body
            dateUpdated
        }
    }
`;

const deleteCommentMutation = gql`
    mutation DeleteComment($userId: String, $postId: String, $commentId: String) {
        deleteComment(postId: $postId, commentId: $commentId, userId: $userId) {
                username    
                body
        }
    }
`;

const getCommentsQuery = gql`
    ${utils.fragments.comment}
    query GetComments($postId: String) {
        comments:getComments(id: $postId) {
            ...commentFields
        }
    }
`;

class CommentApi {

    constructor(client) {
        this.client = client;
    }

    getComments(postId) {
        //Set your fetch policy to cache and network  to retrieve data via api request first and update cache
        return this.client.watchQuery({query: getCommentsQuery, variables: { postId: postId }, fetchPolicy: 'cache-and-network'});
    }

    getCommentsOffline(postId) {
        //Set your fetch policy to retrieve data when your app is offline via the cache.
        return this.client.query({query: getCommentsQuery, variables: { postId: postId }, fetchPolicy: 'cache-only'});
    }

    createComment(commentForm) {
        return this.client.mutate({mutation: createCommentMutation, variables: { commentForm: commentForm }});
    }

    updateComment(commentId, commentForm) {
        return this.client.mutate({mutation: updateCommentMutation, variables: { commentId: commentId, commentForm: commentForm }});
    }

    deleteComment(postId, userId, commentId) {
        return this.client.mutate({mutation: deleteCommentMutation, variables: { commentId: commentId, postId: postId, userId: userId}});
    }

}

export default CommentApi;