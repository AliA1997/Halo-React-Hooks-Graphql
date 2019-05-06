const utils = require('../utils/index');
const UserItem = require('../classes/users/UserItem');
const User = require('../classes/users/User');
const PasswordHasher = require('../classes/misc/PasswordHasher');
//IMport firebase to query based on id using firebase.firestore.FieldBPath.documentId()
const firebase = require('firebase');

module.exports = {
    Query: {
        getAllUsers: async (parent, args, context, info) => {
            let usersToReturn = [];
            const db = context.db;

            //Get the users from the firestore via the collection method. with the get method that will get all data from that collection.
            return db.collection('users').orderBy(firebase.firestore.FieldPath.documentId()).limit(20).get()
                    .then((querySnapshot) => {
                       
                        //Retrieve the last document and the next documents using the last document.
                        // const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

                        // const nextDocs = db.collection('users').firstAfter(lastDoc).limit(20);
                        // const docsRef = querySnapshot.orderBy().limit(10);

                        querySnapshot.forEach(userDoc => {
                            const user = userDoc.data();


                            usersToReturn.push(new UserItem(userDoc.id, user.username, user.avatar));
                        
                        });
                        //Your result will be a object that will require the use of the data method to retrieve data for that query.
                        //Map over the array and get the data from each document.s
                        return usersToReturn;
                    });

        },

        getUser: (_, args, context) => {
            let userToReturn;
            const userId = args.id;
            const db = context.db;

            //To query a single document use the doc method and pass your doc id, that will retrieve a single document.
            return db.collection('users').doc(userId).get()
                    .then((querySnapshot) => {
                    
                        //Retrieve the data from the query snapshot.
                        const user = querySnapshot.data();                        

                        //Then define a new instance of the user
                        userToReturn = new User(querySnapshot.id, user.username, user.password, user.avatar, user.age, user.dateRegistered);
                    
                        //Return the user queried.
                        return userToReturn;

                    });
        },
    },
    
    Mutation: {
        login: (parent, args, context, info) => {
            const { username, password } = args.loginForm,
                  { db, session } = context;
                
            return db.collection('users').where('username', '==', username).get()
                .then((querySnapshot) => {
                    let userInfo;
                    
                    if(querySnapshot.docs.length)
                        userInfo = querySnapshot.docs[0].data();

                    return userInfo || false;
                })
                .then(async resultToReturn => {
                    //If the collection cannot find the user info based on the username then throw a new error
                    if(!resultToReturn)
                        throw new Error('User not found!');


                    //Check if the passwords match.
                    const doPasswordsMatch = await PasswordHasher.verifyPassword(password, resultToReturn.password);

                    if(!doPasswordsMatch)
                        throw new Error("Invalid password or username!");

                    session.user = resultToReturn;

                    return resultToReturn;
                });
        },
        register: async (parent, args, context, info) => {
            const { username, password, avatar, age, dateRegistered } = args.registerForm,
                  { db, session } = context,
                   hashedPassword = await PasswordHasher.generatePasswordHash(password),
                   userToRegister = new utils.InputWrapper("user", username, password, avatar, age, dateRegistered).returnObj("user");
            
           userToRegister.password = hashedPassword;

           //Use google firestore to add docs with a auto generated id.
            return db.collection('users').add(userToRegister)
                .then((docsRef) => {
                    //NOw retrieve the id using the doc reference id.
                    return db.collection('users').doc(docsRef.id).get()
                        .then((docToReturn) => {
                            return docToReturn.data();
                        })
                })
                .then((resultToReturn) => {
                    session.user = resultToReturn;
                    return resultToReturn;
                })
        },
        logout: (_, args, context) => {
            context.session.user = null;
            return;
        },
        updateUser: (_, args, context) => {
            const { username, avatar, age, dateUpdated } = args.userForm,
                  userId = args.userId;
            // const userToUpdate = new utils.InputWrapper("user", username, avatar)
      
        },
        deleteUser: (_, args, context) => {
            const userId = args.userId;
      
        }
    }
}