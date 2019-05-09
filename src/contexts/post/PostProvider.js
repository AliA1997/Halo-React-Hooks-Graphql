import React, { useReducer } from 'react';
import { PostContext, PostReducer } from './postReducer';
import initialState from './postInitialState';


const PostProvider = (props) => {

    const [ state, dispatch ] = useReducer(PostReducer, initialState);

    return (
        <PostContext.Provider value={{state, dispatch}}>
            {props.children}
        </PostContext.Provider>
    );
};

export default PostProvider;