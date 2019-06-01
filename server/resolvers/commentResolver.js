const utils = require('../utils/index');
const resolverUtils = require('./resolverUtils');

module.exports = {
    Query: {
        getComments: (_, args, context) => {
            const { postId } = args, 
                  { db } = context.req;
            //Get the comments using the postId
            return db.collection('comments').get()
                .then(querySnapshot => {
                    let commentsToReturn = [];
                    console.log(querySnapshot.length);
                    querySnapshot.forEach(commentDoc => {
                        const comment = commentDoc.data();

                        commentsToReturn.push(new utils.InputWrapper(
                                                    'update-c',
                                                    commentDoc.id, 
                                                    comment.username, 
                                                    comment.body, 
                                                    comment.dateCreated, 
                                                    comment.avatar,
                                                    comment.dateUpdated,
                                                    comment.deletedInd, 
                                                    comment.permanentlyDeletedInd,
                                                    postId
                                                ).returnObj('update-c')
                                            );
                    })

                    return commentsToReturn;
                }).catch(err => console.log("Get Comments Error-----------------", err));
        },
    },
    
    Mutation: {
        createComment: (_, args, context) => {
            const { commentForm, postId } = args,
                  { username, avatar, body, dateCreated } = commentForm,
                  { db } = context.req,
                  postRef = db.doc(`/posts/${postId}`),
                  commentToAdd = new utils.InputWrapper("comment", username, body, dateCreated, avatar, '', 0, 0, postRef.id).returnObj("comment");

            //Add comment to the comment db collection.
            return db.collection('comments').add(commentToAdd)
                .then(docRef => {
                    return docRef.get()
                        .then(doc => {
                            const createdComment = doc.data();
                        
                            return new utils.InputWrapper(
                                                            "update-c",
                                                            doc.id,
                                                            createdComment.username,
                                                            createdComment.body,
                                                            createdComment.dateCreated,
                                                            createdComment.avatar,
                                                            createdComment.dateUpdated,
                                                            createdComment.deletedInd,
                                                            createdComment.permanentlyDeletedInd,
                                                            createdComment.postId
                            ).returnObj('update-c');
                        });
                }).catch(err => console.log("Created Comment Error--------------", err));
        },
        updateComment: (_, args, context) => {
            const { commentId, commentForm } = args,
                  { postId, username, avatar, body, dateCreated, dateUpdated } = commentForm,
                  { db } = context.req,
                  postRef = db.doc(`/posts/${postId}`),
                  commentToUpdate = new utils.InputWrapper(
                                                "update-c",
                                                commentId,
                                                username, 
                                                body, 
                                                dateCreated, 
                                                avatar, 
                                                dateUpdated, 
                                                0,
                                                0,
                                                postRef.id
                                            ).returnObj('update-c');
            
            
            const commentRefToUpdate = db.collection('comments').doc(commentId);

            return db.collection('comments').doc(commentId).update(commentToUpdate)
                .then(() => {
                    console.log(`Comment with an id of ${commentId} successfully updated!`);
                    return commentRefToUpdate.get();
                })
                .then(docRef => {
                    return {
                        id: docRef.id,
                        ...docRef.data()
                    };  
                })
                .catch((error) => {
                    console.log('Comment not updated successfully!', error);
                });

        },
        deleteComment: (_, args, context) => {
            const postId = args.postId,
                  commentId = args.commentId,
                  userId = args.userId,
                  { db } = context.req,
                  deletedComment = { deletedInd: 1, permanentlyDeletedInd: 0 };
            //Delete from the posts collection by retrieving the post then deleting via soft delete it using a compound query
            //Retrieving post to update it with a deletedInd set to 1;
            return db.collection('posts').doc(postId).get()
                .then(postDocRef => {
                    return (postDocRef.id === postId && postDocRef.data().userId === userId);
                })
                .then(isUserPost => {
                    if(!isUserPost)
                        throw new Error(`Can't delete comments from post.`);
                    //Retrieve the comment and update the comment by updating it's deletedInd to true.
                    return db.collection('comments').doc(commentId);
                })
                .then(commentToDelete => {
                     //If there is not comment then throw an error
                    if(!commentToDelete) 
                        throw new Error('comment not found.');

                    //Else update the comment in the collection.
                    return commentToDelete.update(deletedComment)
                        .then(() => {
                            const successMessage = `Comment with an id of ${commentId} successfully deleted!`;
                            console.log(successMessage);
                            return { body: successMessage };
                        });
           
                })
                .catch(err => console.log("Delete Comment Error--------------", err));
        }
    }
}