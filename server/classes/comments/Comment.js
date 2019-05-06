class Comment {
    constructor(id, postId, username, body, dateCreated, deletedInd, permanentlyDeletedInd) {
        if(id)
            this.id = id;
        if(postId)
            this.postId = postId
        this.username = username;
        this.body = body;
        this.dateCreated = dateCreated;
        if(deletedInd) 
            this.deletedInd = deletedInd;
        else 
            this.deletedInd = false;
        
        if(permanentlyDeletedInd)
            this.permanentlyDeletedInd = permanentlyDeletedInd;
        else
            this.permanentlyDeletedInd = false;
    }
}

module.exports = Comment;