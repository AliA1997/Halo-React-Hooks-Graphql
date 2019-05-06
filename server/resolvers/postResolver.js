const utils = require('../utils/index');
const PostItem = require('../classes/posts/PostItem');
const Post = require('../classes/posts/Post');
//Import firebase in order to use it's id to orderBy or where.
const firebase = require('firebase');

module.exports = {
    Query: {
        getAllPosts: (parent, args, context, info) => {
            const postsToReturn = [],
                  db = context.db;

            return db.collection('posts').orderBy(firebase.firestore.FieldPath.documentId()).limit(25).get()
                .then((querySnapshot) => {
                    console.log(querySnapshot)
                    querySnapshot.forEach(postDoc => {

                        const post = postDoc.data();

                        postsToReturn.push(new PostItem(postDoc.id, post.title, post.image, post.dateCreated));

                    });
                    
                    return postsToReturn;
                });
        },
        
        getPost: (_, args, context) => {
            let postToReturn;

            const postId = args.id,
                  db = context.db;

            //Use .doc to get a specific document.
            return db.collection('posts').doc(postId).get()
                .then((querySnapshot) => {
                    
                    const postDoc = querySnapshot,
                          post = postDoc.data(),
                          postToReturn = new Post(postDoc.id, post.title, post.image, post.tags, post.dateCreated);

                    return postToReturn;
                });
        },
        
        getPosts: (_, args, context) => {
            let postsToReturn;
            const userId = args.userId,
                  db = context.db;

            return db.collection('posts').where('userId', '==', userId).get()
                .then((querySnapshot) => {

                    //Loop over query snap shot and push each initialized document to your postsToReturn variable.
                    querySnapshot.forEach(postDoc => {

                        //Initialize your doc via the doc.data()
                        const post = postDoc.data();

                        //Push it ot your postsToReturn
                        postsToReturn.push(new PostItem(postDoc.id, post.title, post.image, post.dateCreated));
                    
                    });

                    //Then return the postsToReturn;
                    return postsToReturn;
                });

        },
    },
    
    Mutation: {
        createPost: (_, args, context) => {
            const postForm = args.postForm,
                  postToAdd = new utils.InputWrapper("post", postForm.title, postForm.image, postForm.dateCreated).returnObj("post");

            //Use google firestore to add the document with a auto-generated id.
            return db.collection('posts').add(postToAdd)
                .then(docsRef => {
                    console.log("Post docRef-----------", docsRef);
                });
        },
        updatePost: (_, args, context) => {
            const { db } = context,
                  { title, image, tags, dateUpdated } = args.updatedPost,
                  userId = args.userId,
                  postId = args.postId,
                  postToUpdate = new utils.InputWrapper("update-post", postId, userId, title, image, tags, dateUpdated).returnObj('update-post');

            //Update the post using the the first store update method.
            return db.collection('posts').update(postToUpdate)
                .then(docRef => {
                    console.log("Updated docRef----------", docRef);
                });
                  
        },
        deletePost: (_, args, context) => {
            const { db } = context,
                  postId = args.postId,
                  userId = args.userId;

            //Use a compound query and compound indexes to retrieve posts on multiple where statements.
            return db.collection('posts').where('id', '==', postId).where('userId', '==', userId)
                .then((querySnapshot) => {
                    const postToDelete = new Post(querySnapshot[0].id, querySnapshot[0].title, querySnapshot[0].image, querySnapshot[0].tags, querySnapshot[0].dateCreated, 1),
                          postToUpdate = new utils.InputWrapper("delete-post", postToDelete.id, postToDelete.title, postToDelete.image, postToDelete.tags, postToDelete.dateCreated, postToDelete.deletedInd).returnObj("delete-post");
                    
                    //Use google firestore to update that specific document.
                    return db.collection('posts').update(postToUpdate)
                        .then(docRef => {
                            console.log('docRef updatePost-------', docRef);
                        });
                })
        }
    }
}