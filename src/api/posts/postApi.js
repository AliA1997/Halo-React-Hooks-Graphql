import gql from 'graphql-tag';
import * as utils from '../../utils';

const getPostsQuery = gql`
    ${utils.fragments.post}
    query {
        posts:getAllPosts {
            ...postItemFields
        }
    }
`;

const getUserPostsQuery = gql`
    ${utils.fragments.post}
    query GetUserPosts($userId: String) {
        posts:getUserPosts(userId: $userId) {
            ...postItemFields
        }
    }
`;

const searchPostsQuery = gql`
    ${utils.fragments.post}
    query SearchPosts($searchVal: String) {
        posts:searchPosts(searchVal: $searchVal) {
            ...postItemFields
        }
    }
`;

const searchUserPostsQuery = gql`
    ${utils.fragments.post}
    query SearchUserPosts($searchVal: String, $userId: String) {
        posts:searchUserPosts(searchVal: $searchVal, userId: $userId) {
            ...postItemFields
        }
    }
`;

const getSinglePostQuery = gql`
    ${utils.fragments.postPage}
    query GetSinglePost($postId: String) {
        post:getPost(id: $postId) {
            ...postFields
        }
    }
`;

const createPostMutation = gql`
    ${utils.fragments.post}
    mutation CreatePost($userId: String, $postForm: PostForm) {
        createPost(postForm: $postForm, userId: $userId) {
            ...postItemFields
        }
    }
`;

const updatePostMutation = gql`
    mutation UpdatePost($userId: String, $postId: String, $updatedPost: UpdatePostInput) {
        updatePost(updatedPost: $updatedPost, postId: $postId, userId: $userId) {
            id
            title
            image
            dateCreated
        }
    }
`;

const deletePostMutation = gql`
    mutation DeletePost($userId: String, $postId: String) {
        deletePost(postId: $postId, userId: $userId) {
            title
        }
    }
`;

class Post {
    constructor(client) {
        this.client = client;
    }

    getAllPosts() {
        //Set your fetch policy to cache and network rather than cache-first that retrieve data via api request, and if the data is different update's cache.
        return this.client.watchQuery({query: getPostsQuery, fetchPolicy: 'cache-and-network'});
    }

    getAllPostsOffline() {
        //Set your fetch policy to just cache since when the app is offline it will retrieve the data from the cache.
        return this.client.query({query: getPostsQuery, fetchPolicy: 'cache-only'});
    }

    searchPosts(searchVal) {
        return this.client.watchQuery({query: searchPostsQuery, variables: { searchVal }, fetchPolicy: 'cache-and-network'});
    }

    searchPostsOffline(searchVal) {
        return this.client.query({query: searchPostsQuery, variables: { searchVal }, fetchPolicy: 'cache-only'});
    }

    searchUserPosts(userId, searchVal) {
        return this.client.watchQuery({query: searchUserPostsQuery, variables: { searchVal, userId }, fetchPolicy: 'cache-and-network'});
    }

    searchUserPostsOffline(userId, searchVal) {
        return this.client.query({query: searchUserPostsQuery, variables: { searchVal, userId }, fetchPolicy: 'cache-only'});
    }

    getUserPosts(userId) {
        //Set the fetch policy to cache and network to retrieve data via api request and when the data is different then will update cache
        return this.client.watchQuery({query: getUserPostsQuery, variables: { userId: userId }, fetchPolicy: 'cache-and-network'});
    }

    getUserPostsOffline(userId) {
        //Set your fetch policy to cache only to retrieve data form cache when app is offline
        return this.client.query({query: getUserPostsQuery, variables: { userId: userId }, fetchPolicy: 'cache-only'});
    }

    getPost(postId) {
        //Get the data from the api first and if the data is different then update the cache
        return this.client.watchQuery({query: getSinglePostQuery, variables: { postId: postId }, fetchPolicy: 'cache-and-network'});
    }

    getPostOffline(postId) {
        //If your app is offline get the data from the cache only
        return this.client.query({query: getSinglePostQuery, variables: { postId: postId }, fetchPolicy: 'cache-only'});
    }

    createNewPost(userId, postForm) {
        return this.client.mutate({mutation: createPostMutation, variables: {userId: userId, postForm: postForm}  });
    }

    updatePost(postId, userId, updatedPost) {
        return this.client.mutate({mutation: updatePostMutation, variables: { userId: userId, postId: postId, updatedPost: updatedPost }});
    }

    deletePost(userId, postId) {
        return this.client.mutate({mutation: deletePostMutation, variables: { userId: userId, postId: postId } });
    }
}

export default Post;