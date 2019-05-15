class User {
    constructor(id, username, password, avatar, age, friends, socialMedia, dateRegistered, deletedInd=null, permanentlyDeletedInd=null) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.avatar = avatar;
        this.age = age;
        this.dateRegistered = dateRegistered;
        if(deletedInd) 
            this.deletedInd = deletedInd;
        if(permanentlyDeletedInd)
            this.permanentlyDeletedInd = permanentlyDeletedInd;
        this.friends = friends;
        this.socialMedia = socialMedia;
    }

}

module.exports = User;