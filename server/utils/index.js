try {
    //index.js
    const utils = require('./build/Release/utils.node');

    // const commentObj = new utils.InputWrapper('comment', 'username', 'body', 'dateCreaed', 'avatar', '', 0, 0, 'postId');
    // const registerObj = new utils.InputWrapper('register', 'username', 'password', 'avatar', 21, 'dateRegistered', '', 0, 0);
    // const userUpdateObj = new utils.InputWrapper('user', 'id', 'username', 'avatar', 21, 'dateRegistered', '', 0, 0);
    // // const socialMediaObj = new utils.InputWrapper('socialMedia', 'id', 'ins', 'link',  'twitter');
    // const postObj = new utils.InputWrapper('post', 'title', 'Image', 'dateCreaed', '', 0, 0, 'userId');
    // const updatePObj = new utils.InputWrapper('update-p', 'id', 'title', 'Image', 'dateCreaed', '', 0, 0, 'userId');
    // const updateCObj = new utils.InputWrapper('update-c', 'id', 'username', 'body', 'dateCreaed', 'avatar', 'dateUpdate', 0, 0, 'postId');

    // const smUpdateObj = new utils.InputWrapper('update-sm', 'id', 'ins', 'link',  'twitter', 'linkedin');


    // console.log('utils registerForm--------', registerObj.returnObj('register'));
    
    // console.log('utils----------------', postObj.returnObj('post'))

    // // // console.log('utils socialMedia---------------------', socialMediaObj.returnObj('socialMedia'));

    // console.log('utils update-user---------------------', userUpdateObj.returnObj('user'));
    
    // console.log('utils--------------------- updateC', updateCObj.returnObj('update-c'));

    // console.log('utils--------------- updateP', updatePObj.returnObj('update-p'));

    // console.log('utiles---------------', smUpdateObj.returnObj('update-sm'));

    module.exports = utils;

} catch(error) {
    console.log('error-----', error);
}