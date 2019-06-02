const utils = require('../utils/index');
const PasswordHasher = require('../classes/misc/PasswordHasher');
//IMport firebase to query based on id using firebase.firestore.FieldBPath.documentId()
const firebase = require('firebase');
const resolverUtils = require('./resolverUtils');

module.exports = {
    Query: {
        getAllUsers: async (parent, args, context, info) => {
            let usersToReturn = [];
            const { db } = context.req;

            //Get the users from the firestore via the collection method. with the get method that will get all data from that collection.
            return db.collection('users').where('deletedInd', '==', 0).orderBy(firebase.firestore.FieldPath.documentId()).limit(20).get()
                    .then((querySnapshot) => {
                       
                        //Retrieve the last document and the next documents using the last document.
                        // const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

                        // const nextDocs = db.collection('users').firstAfter(lastDoc).limit(20);
                        // const docsRef = querySnapshot.orderBy().limit(10);

                        querySnapshot.forEach(userDoc => {
                            const user = userDoc.data();


                            usersToReturn.push(
                                new utils.InputWrapper(
                                    'user',
                                    userDoc.id,
                                    user.username,
                                    user.avatar,
                                    user.age,
                                    user.dateRegistered,
                                    user.dateUpdated,
                                    user.deletedInd,
                                    user.permanentlyDeletedInd
                                ).returnObj('uItem')
                            );                        
                        });
                        //Your result will be a object that will require the use of the data method to retrieve data for that query.
                        //Map over the array and get the data from each document.s
                        return usersToReturn;
                    });

        },

        searchUsers: (_, args, context) => {
            let usersToReturn = [];
            const { searchVal } = args,
                  { db } = context.req;

            return db.collection('users').where('deletedInd', '==', 0).orderBy('username').startAt(searchVal).get()
                .then(querySnapshot => {
                    
                    querySnapshot.forEach(userDoc => {

                        const user = userDoc.data();

                        usersToReturn.push(
                            new utils.InputWrapper(
                                'user',
                                userDoc.id,
                                user.username,
                                user.avatar,
                                user.age,
                                user.dateRegistered,
                                user.dateUpdated,
                                user.deletedInd,
                                user.permanentlyDeletedInd
                            ).returnObj('uItem')
                        );
                    });

                    return usersToReturn;
                });
        },

        getUser: (_, args, context) => {
            let userToReturn;
            console.log('args--------------', args);
            const { id } = args,
                  { db } = context.req;
            
            const socialMediaPlaceholder = {
                facebook: '',
                instagram: '',
                linkedin: '',
                twitter: ''
            };
            //To query a single document use the doc method and pass your doc id, that will retrieve a single document.
            return db.collection('users').doc(id).get()
                    .then((docRef) => {
                        
                        //Retrieve the data from the query snapshot.
                        const user = docRef.data();                        
                        console.log('user---------------', user);
                        //Then define a new instance of the user
                        userToReturn = new utils.InputWrapper(
                                                                "user", 
                                                                docRef.id, 
                                                                user.username, 
                                                                user.avatar, 
                                                                user.age, 
                                                                user.dateRegistered, 
                                                                user.dateUpdated, 
                                                                user.deletedInd, 
                                                                user.permanentlyDeletedInd
                                                            ).returnObj('user');
                        
                        userToReturn.friends = [""];

                        console.log("userToReturn---------------", userToReturn);
                        //Return the user queried.
                        return userToReturn;

                    })
                    .then(userInfo => {
                        userInfo.socialMediaInfo = new utils.InputWrapper(
                                                                            'socialMedia',
                                                                            socialMediaPlaceholder.facebook,
                                                                            socialMediaPlaceholder.instagram,
                                                                            socialMediaPlaceholder.linkedin,
                                                                            socialMediaPlaceholder.twitter
                                                                    ).returnObj("socialMedia");
                        
                        return userInfo;
                    }).catch(err => console.log('Get User Error-------------', err));
        },
    },
    
    Mutation: {
        login: (parent, args, context, info) => {
            const { username, password } = args.loginForm,
                  { db, session } = context.req;
            
            return db.collection('users').where('username', '==', username).get()
                .then((querySnapshot) => {
                    if(querySnapshot.docs.length) {
                        const docRef = querySnapshot.docs[0];
                        return docRef;
                    }
                    return undefined;
                })
                .then((userDoc) => {
                    
                    if(userDoc) {
                    
                        let userInfo;
                    
                        userInfo = userDoc.data();
                    
                        userInfo.id = userDoc.id;
                    
                        //Use resolverUtils to get Reference value object since it will timeout before the .then is completed.
                        // userInfo.socialMediaInfo = resolverUtils.getReferenceValue(db, userDoc.data(), 'socialMediaId');
                        userInfo.socialMediaInfo = { facebook: '', instagram: '', linkedin: '', twitter: '' };
                        
                        return userInfo;
                    
                    }
                    return false;
                 })
                .then(async resultToReturn => {
                    // If the collection cannot find the user info based on the username then throw a new error
                    if(!resultToReturn)
                        throw new Error('User not found!');


                    //Check if the passwords match.
                    const doPasswordsMatch = await PasswordHasher.verifyPassword(password, resultToReturn.password);

                    if(!doPasswordsMatch)
                        throw new Error("Invalid password or username!");
                    
                    delete resultToReturn.socialMedia;

                    session.user = resultToReturn;
                    
                    session.save();

                    delete resultToReturn.socialMedia;

                    return resultToReturn;
                })
                .catch(err => console.log("Get Login Error---------------", err));
        },
        register: async (parent, args, context, info) => {
            const { username, password, avatar, age, dateRegistered } = args.registerForm,
                  { db, session } = context.req,
                   hashedPassword = await PasswordHasher.generatePasswordHash(password),
                   userToRegister = new utils.InputWrapper("register", username, password, avatar, age, dateRegistered, '', 0, 0).returnObj("register");
            
           userToRegister.password = hashedPassword;

           //Use google firestore to add docs with a auto generated id.
            return db.collection('users').add(userToRegister)
                .then((docsRef) => {
                    //NOw retrieve the id using the doc reference id.
                    return db.collection('users').doc(docsRef.id).get()
                        .then((docToReturn) => {
                            console.log('docToReturn--------------', docToReturn.data());
                            return docToReturn.data();
                        })
                })
                .then((resultToReturn) => {
                    session.user = resultToReturn;
                    session.save();
                    return resultToReturn;
                })
                .then((userRes) => {
                    return db.collection('socialMedia').add(
                        new utils.InputWrapper('socialMedia', '', '', '', '').returnObj('socialMedia')
                    );
                })
                .then(() => {
                    return session.user;
                })
        },
        logout: (_, args, context) => {
            context.req.session.destroy();
            return;
        },
        updateUser: (_, args, context) => {
            const { userId, updateUserForm } = args, 
                  { username, avatar, age, dateRegistered, dateUpdated } = updateUserForm,
                  { db } = context.req,
                  userToUpdate = new utils.InputWrapper(
                                                'user',
                                                userId,
                                                username,
                                                avatar,
                                                age,
                                                dateRegistered,
                                                dateUpdated,
                                                0,
                                                0
                                            ).returnObj('user');

            const userDocToUpdate = db.collection('users').doc(userId);
            return db.collection('users').doc(userId).update(userToUpdate)
                .then(() => {
                    console.log(`User with id of ${userId} successfully updated.`);
                    return userDocToUpdate.get();
                })
                .then(docRef => {
                    return {
                        id: docRef.id,
                        ...docRef.data()
                    };
                }).catch(err => console.log('Update User Error--------', err))

                  
        },
        updateSocialMedia: (_, args, context) => {
            const { userId, socialMediaForm, socialMediaId } = args,
                  { type, value } = socialMediaForm,
                  { db } = context.req;
                
            const smToUpdate = db.collection('socialMedia').doc(socialMediaId);

            let socialMediaToReturn;
            
            return db.collection('users').doc(userId).get()
                .then(docRef => {
                    return (docRef.userId == userId);
                })
                .then(isUser => {
                    if(isUser)
                        throw new Error('User not found.');
                    return smToUpdate.get();
                })
                .then(smDocRef => {
                    console.log(smToUpdate);
                    const smInfo = smDocRef.data();
                    const updatedSocialMedia = resolverUtils.determineTypeOfSm(type, value, smInfo, socialMediaId);
                    socialMediaToReturn = updatedSocialMedia;
                    return smToUpdate.update(updatedSocialMedia);
                })
                .then(() => {
                    return socialMediaToReturn;
                })
                .catch(err => console.log('Update Social Media Error---------------', err))
        },
        deleteUser: (_, args, context) => {
            const userId = args.userId,
                  { db } = context.req, 
                  deletedUser = { deletedInd: 1, permanentlyDeletedInd: 0 };
            //Define a unresolved promise that will be used to soft delete the document
            const userToDelete = db.collection('users').doc(userId);

            return db.collection('users').doc(userId).get()
                .then(docRef => {
                    return userToDelete.update(deletedUser)
                })
                .then(() => {
                    const successMessage = `User with an id of ${userId} deleted successfully!`;
                    console.log(successMessage);
                    return { body: successMessage };
                })
                .catch(error => console.log("Error deleting user------------------", error));
        }
    }
}