const gql = require("graphql-tag");

const typeDefs = gql`
    scalar Date 

    interface IPost {
        id: String
        title: String
        image: String
        dateCreated: Date
    }

    input PostForm  {
        userId: String
        title: String
        image: String
        tags: [String]
        dateCreated: Date
    }

    input UpdatePostInput {
        title: String
        image: String
        tags: [String]
        dateCreated: Date
        dateUpdated: String
    }

    type PostItem implements IPost {
        id: String
        title: String
        image: String
        dateCreated: Date
    }

    type Post implements IPost {
        id: String
        title: String
        image: String
        tags: [String]
        dateCreated: Date
        dateUpdated: Date
        deletedInd: Boolean
        permanentlyDeletedInd: Boolean
    }


    type Query {
        getAllPosts: [PostItem]
        getPost(id: String): Post
        getPosts(userId: String): [PostItem]
        searchPosts(searchVal: String): [PostItem]
        searchUserPosts(searchVal: String, userId: String): [PostItem]
    }
    
    type Mutation {
        createPost(postForm: PostForm, userId: String): PostItem
        updatePost(updatedPost: UpdatePostInput, postId: String, userId: String): PostItem
        deletePost(postId: String, userId: String): Message
    }

    schema {
        query: Query
        mutation: Mutation 
    }
`;

module.exports = typeDefs;
