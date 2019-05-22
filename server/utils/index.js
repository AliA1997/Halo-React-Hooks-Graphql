try {
    //index.js
    const utils = require('./build/Release/utils.node');

    const commentObj = new utils.InputWrapper('comment', 'username', 'body', 'dateCreaed');
    const registerObj = new utils.InputWrapper('register', 'username', 'password', 'avatar', 21, 'dateRegistered');
    const userUpdateObj = new utils.InputWrapper('user', 'id', 'username', 'avatar', 21, 'dateRegistered');
    const socialMediaObj = new utils.InputWrapper('socialMedia', 'id', 'ins', 'link',  'twitter');
    const postObj = new utils.InputWrapper('post', 'title', 'Image', 'dateCreaed', 'userId');


    console.log('utils--------', registerObj.returnObj('register'));
    
    console.log('utils----------------', postObj.returnObj('post'))

    console.log('utils socialMedia---------------------', socialMediaObj.returnObj('socialMedia'));

    console.log('utils update-user---------------------', userUpdateObj.returnObj('suser'));
    
    console.log('utils---------------------', commentObj.returnObj('comment'));



    module.exports = utils;

} catch(error) {
    console.log('error-----', error);
}