import React, { useReducer } from 'react';
import { PostContext, PostReducer } from './postReducer';
import postInitialState from './postInitialState';


const PostProvider = (props) => {

    const [ state, dispatch ] = useReducer(PostReducer, postInitialState);

    return (
        <PostContext.Provider value={{state, dispatch}}>
            {props.children}
        </PostContext.Provider>
    );
};

export default PostProvider;