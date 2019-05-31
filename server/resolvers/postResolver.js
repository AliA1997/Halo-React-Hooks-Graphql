const utils = require('../utils/index');
//Import firebase in order to use it's id to orderBy or where.
const firebase = require('firebase');

module.exports = {
    Query: {
        getAllPosts: (parent, args, context, info) => {
            const postsToReturn = [],
                  db = context.req.db;

            return db.collection('posts').orderBy(firebase.firestore.FieldPath.documentId()).limit(25).get()
                .then((querySnapshot) => {

                    querySnapshot.forEach(postDoc => {

                        const post = postDoc.data();

                        if(post)
                            postsToReturn.push(new utils.InputWrapper(
                                                'update-p',
                                                postDoc.id, 
                                                post.title, 
                                                post.image, 
                                                post.dateCreated, 
                                                post.dateUpdated,
                                                post.deletedInd,
                                                post.permanentlyDeletedInd,
                                                post.userId
                                            ).returnObj('update-p')
                    
                                        );

                    });
                    
                    return postsToReturn;
                })
                .catch(err => console.log('error-----------------------', err));
        },
        
        getPost: (_, args, context) => {
            let postToReturn;

            const postId = args.id,
                  db = context.req.db;

            //Use .doc to get a specific document.
            return db.collection('posts').doc(postId).get()
                .then((querySnapshot) => {
                    
                    const postDoc = querySnapshot,
                          post = postDoc.data();

                    postToReturn = new utils.InputWrapper(
                                        'update-p',
                                        postDoc.id, 
                                        post.title, 
                                        post.image, 
                                        post.dateCreated,
                                        post.dateUpdated,
                                        post.deletedInd,
                                        post.permanentlyDeletedInd,
                                        post.userId
                                    ).returnObj('update-p');

                    postToReturn.tags = post.tags;

                    return postToReturn;
                });
        },
        
        getPosts: (_, args, context) => {
            let postsToReturn;
            const userId = args.userId,
                  db = context.req.db;

            return db.collection('posts').where('userId', '==', userId).get()
                .then((querySnapshot) => {

                    //Loop over query snap shot and push each initialized document to your postsToReturn variable.
                    querySnapshot.forEach(postDoc => {

                        //Initialize your doc via the doc.data()
                        const post = postDoc.data();

                        //Push it ot your postsToReturn
                        postsToReturn.push(new utils.InputWrapper(
                                                                'update-p',
                                                                postDoc.id, 
                                                                post.title, 
                                                                post.image, 
                                                                post.dateCreated,
                                                                post.dateUpdated,
                                                                post.deletedInd,
                                                                post.permanentlyDeletedInd,
                                                                post.userId
                                                        ).returnObj('update-p')
                                            );
                    
                    });

                    //Then return the postsToReturn;
                    return postsToReturn;
                });

        },

        searchPosts: (_, args, context) => {
            let postsToReturn;
            const searchValue = args.searchValue,
                  db = context.req.db;

            return db.collection('posts').orderBy('title').startAt(searchValue).endAt(searchValue+'\uf8ff').get()
                .then(querySnapshot => {
                    querySnapshot.forEach(docRef => {
                        const post = docRef.data();

                        postsToReturn.push(new utils.InputWrapper(
                                                                'update-p',
                                                                docRef.id, 
                                                                post.title, 
                                                                post.image, 
                                                                post.dateCreated,
                                                                post.dateUpdated,
                                                                post.deletedInd,
                                                                post.permanentlyDeletedInd,
                                                                post.userId
                                                            ).returnObj('update-p')
                                            );
                    });

                    return postsToReturn;
                });


        },

        searchUserPosts: (_, args, context) => {
            let postsToReturn;
            const searchValue = args.searchValue,
                  userId = args.userId,
                  db = context.req.db;

            return db.collection('posts').where('userId', '==', userId).orderBy('title').startAt(searchValue).endAt(searchValue+'\uf8ff').get()
                .then(querySnapshot => {
                    
                    querySnapshot.forEach(docRef => {
                        const post = docRef.data();

                        postsToReturn.push(new utils.InputWrapper(
                                                                'update-p',
                                                                docRef.id, 
                                                                post.title, 
                                                                post.image, 
                                                                post.dateCreated,
                                                                post.dateUpdated,
                                                                post.deletedInd,
                                                                post.permanentlyDeletedInd,
                                                                post.userId
                                                            ).returnObj('update-p')
                                            );
                    })

                    return postsToReturn;

                });
        }

    },
    
    Mutation: {
        createPost: (_, args, context) => {
            const { postForm, userId } = args,
                    { title, image, dateCreated, tags } = postForm,
                    { db } = context.req,
                    userRef =  db.doc(`/users/${userId}`);

            let postToAdd = new utils.InputWrapper("post", title, image, dateCreated, '', 0, 0, userRef.id).returnObj("post");
            postToAdd.tags = tags;
            //Use google firestore to add the document with a auto-generated id.
            return db.collection('posts').add(postToAdd)
                .then(docsRef => {
                    
                    return docsRef.get()
                        .then(docRes => {
                            return {
                                id: docRes.id,
                                title: postToAdd.title,
                                image: postToAdd.image,
                                dateCreated: postToAdd.dateCreated
                            };
                        });

                })
                .catch(err => console.log("Create Post Error---------------", err));

        },
        updatePost: (_, args, context) => {
            const { db } = context.req,
                  { userId, postId, updatedPost } = args,
                  { title, image, tags, dateCreated, dateUpdated } = updatedPost,
                  userRef = db.doc(`/users/${userId}`),
                  postToUpdate = new utils.InputWrapper("update-p", postId, title, image, dateCreated, dateUpdated, 0, 0, userRef.id).returnObj("update-p");

            postToUpdate.tags = tags;

            //Get the reference the post to update.
            const postRefToUpdate = db.collection('posts').doc(postId);

            //Update the post using the the first store update method.
            return db.collection('posts').doc(postId).update(postToUpdate)
                .then(() => {
                    console.log(`Post with an id ${postId} successfully updated.`);
                    return postRefToUpdate.get();
                })
                .then(docRef => {
                    const post = docRef.data();

                    return {
                        id: docRef.id,
                        title: post.title,
                        image: post.image,
                        dateCreated: post.dateCreated
                    };
                })
                .catch(error => console.log("Error updating post!!", error));
                  
        },
        deletePost: (_, args, context) => {
            const { userId, postId } = args,
                  { db } = context.req,
                  deletedPost = { deletedInd: 1, permanentlyDeletedInd: 0 };

            const postRefToDelete = db.collection('posts').doc(postId);
            //Use a compound query and compound indexes to retrieve posts on multiple where statements.
            return db.collection('posts').doc(postId).get()
                .then((postDoc) => {
                    const post = postDoc.data();
                    return (post.userId === userId)
                })
                .then(isUserPost => {
                    if(!isUserPost)
                        throw new Error("User does not have permission to update post");

                    return postRefToDelete.update(deletedPost)
                        .then(() => {
                            const successMessage = `Post with an id of ${postId} deleted successfully!`
                            console.log(successMessage);
                            return { body: successMessage };
                        })
                })
        }
    }
}