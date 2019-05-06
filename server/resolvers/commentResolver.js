const utils = require('../utils/index');
const Comment = require('../classes/comments/Comment.js');

module.exports = {
    Query: {
        getComments: (_, args, context) => {
            const postId = args.id, 
                 { db } = context;

            //Get the comments using the postId
            return db.collection('comment')
                .then(querySnapshot => {
                    let commentsToReturn = [];

                    querySnapshot.forEach(comment => {
                        commentsToReturn.push(new Comment(comment.id, comment.postId, comment.username, comment.body, comment.dateCreated, comment.deletedInd, comment.permanentlyDeletedInd));
                    })

                    return commentsToReturn;
                })
        },
    },
    
    Mutation: {
        createComment: (_, args, context) => {
            const { username, body, dateCreated } = args.commentForm,
                  commentToAdd = new utils.InputWrapper("comment", username, body, dateCreated).returnObj("comment");
            //Add comment to the comment db collection.
            return db.collection('comment').add(commentToAdd)
                .then(docRef => {
                    console.log('created docRef----------', docRef);
                });
        },
        updateComment: (_, args, context) => {
            const updatedComment = args.commentForm,
                  commentId = args.commentId;

        },
        deleteComment: (_, args, context) => {
            const postId = args.postId,
                  commentId = args.commentId,
                  userId = args.userId;
            //Delete from the posts collection by retrieving the post then deleting via soft delete it using a compound query
            //Retrieving post to update it with a deletedInd set to 1;
            return db.collection('post').where('id', '==', postId)
                .then(querySnapshot => {
                    return (querySnapshot.some(postDoc => postDoc.id === postId && postDoc.data().userId === userId));
                })
                .then(isUserPost => {
                    if(!isUserPost)
                        throw new Error(`Can't delete comments from post.`);
                    //Retrieve the comment and update the comment by updating it's deletedInd to true.
                    return db.collection('comment').where('id', '==', commentId).where('postId', '==', postId)
                        .then(querySnapshot => {
                            //Destruct needed values from querySnapshot.
                            const { id, postId, username, body, dateCreated, dateUpdated, deletedInd, permanentlyDeletedInd } = querySnapshot[0];
                                  
                            return new utils.InputWrapper('delete-comment', id, postId, username, body, dateCreated, dateUpdated, deletedInd, permanentlyDeletedInd).returnObj('delete-comment');
                         })
                })
                .then(commentToDelete => {
                     //If there is not comment then throw an error
                    if(!commentToDelete) 
                        throw new Error('comment not found.');

                    //Else update the comment in the collection.
                    return db.collection('comment').update(commentToDelete)
                        .then(docRef => {
                            console.log('updatedComment--------', docRef);
                        })
           
                })
        }
    }
}