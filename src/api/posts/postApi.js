import gql from 'graphql-tag';


const getPostsQuery = gql`
    query {
        getAllPosts {
            id
            title
            image
            dateCreated
        }
    }
`;

const getUserPostsQuery = gql`
    query GetUserPosts($userId: String) {
        getUserPosts(userId: $userId) {
            id
            title
            image
            dateCreated
        }
    }
`;

const searchPostsQuery = gql`
    query SearchPosts($searchVal: String) {
        searchPosts(searchVal: $searchVal) {
            id
            title
            image
            dateCreated
        }
    }
`;

const searchUserPostsQuery = gql`
    query SearchUserPosts($searchVal: String, $userId: String) {
        searchUserPosts(searchVal: $searchVal, userId: $userId) {
            id
            title
            image
            dateCreated
        }
    }
`;

const getSinglePostQuery = gql`
    query GetSinglePost($postId: String) {
        getPost(id: $postId) {
            id
            title
            image
            tags
            dateCreated
            deletedInd
            permanentlyDeletedInd    
        }
    }
`;

const createPostMutation = gql`
    mutation CreatePost($userId: String, $postForm: PostInput) {
        createPost(postForm: $postForm, userId: $userId) {
            title
            image
            dateCreated
        }
    }
`;

const updatePostMutation = gql`
    mutation UpdatePost($userId: String, $postId: String, $updatedPost: UpdatePostInput) {
        updatePost(updatedPost: $updatedPost, postId: $postId, userId: $userId) {
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
        return this.client.query({query: getPostsQuery, fetchPolicy: 'cache-and-network'});
    }

    getAllPostsOffline() {
        //Set your fetch policy to just cache since when the app is offline it will retrieve the data from the cache.
        return this.client.query({query: getPostsQuery, fetchPolicy: 'cache-only'});
    }

    searchPosts(searchVal) {
        return this.client.query({query: searchPostsQuery, variables: { searchVal }, fetchPolicy: 'cache-and-network'});
    }

    searchPostsOffline(searchVal) {
        return this.client.query({query: searchPostsQuery, variables: { searchVal }, fetchPolicy: 'cache-only'});
    }

    searchUserPosts(userId, searchVal) {
        return this.client.query({query: searchUserPostsQuery, variables: { searchVal, userId }, fetchPolicy: 'cache-and-network'});
    }

    searchUserPostsOffline(userId, searchVal) {
        return this.client.query({query: searchUserPostsQuery, variables: { searchVal, userId }, fetchPolicy: 'cache-only'});
    }

    getUserPosts(userId) {
        //Set the fetch policy to cache and network to retrieve data via api request and when the data is different then will update cache
        return this.client.query({query: getUserPostsQuery, variables: { userId: userId }, fetchPolicy: 'cache-and-network'});
    }

    getUserPostsOffline(userId) {
        //Set your fetch policy to cache only to retrieve data form cache when app is offline
        return this.client.query({query: getUserPostsQuery, variables: { userId: userId }, fetchPolicy: 'cache-only'});
    }

    getPost(postId) {
        //Get the data from the api first and if the data is different then update the cache
        return this.client.query({query: getSinglePostQuery, variables: { postId: postId }, fetchPolicy: 'cache-and-network'});
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