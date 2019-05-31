require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const graphqlLog = require('graphql-log');
const firebase = require('firebase');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema, mergeSchemas } = require('graphql-tools')
//import your typeDefinitions 
const commentTypeDefs =require('./typeDefs/commentTypeDefs');
const postTypeDefs =require('./typeDefs/postTypeDefs');
const userTypeDefs =  require('./typeDefs/userTypeDefs');
//import your resolvers
const commentResolver = require('./resolvers/commentResolver');
const postResolver = require('./resolvers/postResolver');
const userResolver = require('./resolvers/userResolver');

const PORT = 4555;


const firebaseConfig = {
    apiKey: "AIzaSyChNRN7sIdDvqF4CY2BhNWRyLgRlBKNrzQ",
    authDomain: "halo-33bf7.firebaseapp.com",
    databaseURL: "https://halo-33bf7.firebaseio.com",
    projectId: "halo-33bf7",
    storageBucket: "halo-33bf7.appspot.com",
    messagingSenderId: "347339760416",
};


firebase.initializeApp(firebaseConfig);

//Assign your database to a variable.
const database = firebase.firestore();

// console.log('database----------', database);

//Define your main type definition and resolver.
// const resolvers = { 
//     ...commentResolver,
//     ...postResolver,
//     ...userResolver    
// };

//Define your graphql logger
let logger = graphqlLog();


const app = express();

app.use(
    (req, res, next) => {
        // console.log('database middleware------------', database);
        req.db = database;
        next();
    },
);

//Define your graphql path.
const path = '/graphql';

//Define your middleware.
app.use(bodyParser.json());

//Define your session.
app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 14
        }
    })
);

app.use(cors());

const server = new ApolloServer({
                    typeDefs: [postTypeDefs, userTypeDefs, commentTypeDefs],
                    resolvers: [postResolver, userResolver, commentResolver], 
                    logger: logger([this.resolvers]),
                    context: ({req}) => {
                        return {req};
                    }
                });

server.applyMiddleware({
    app: app,
    path: path
});

app.listen(PORT, () => console.log(`Listening on ${PORT}!`))
