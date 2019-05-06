try {
    //index.js
    const utils = require('./build/Release/utils.node');

    const commentObj = new utils.InputWrapper('comment', 'username', 'body', 'dateCreaed');
    const userObj = new utils.InputWrapper('user', 'username', 'password', 'avatar', 21, 'dateRegistered');
    const postObj = new utils.InputWrapper('post', 'title', 'Image', 'dateCreaed');


    console.log('utils--------', commentObj.returnObj('comment'))

    console.log('utils--------', postObj.returnObj('post'))

    console.log('utils--------', userObj.returnObj('user'))


    module.exports = utils;

} catch(error) {
    console.log('error-----', error);
}