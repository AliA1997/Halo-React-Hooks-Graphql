class Post {
    constructor(id, title, image, tags, dateCreated, deletedInd=null, permanentlyDeletedInd=null) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.tags = tags;
        this.dateCreated = dateCreated;
        if(deletedInd)
            this.deletedInd = deletedInd;
        if(permanentlyDeletedInd) 
            this.permanentlyDeletedInd = permanentlyDeletedInd;
    }
}

module.exports = Post;