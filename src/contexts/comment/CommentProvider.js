import React, { useReducer } from 'react';
import { CommentContext,  CommentReducer } from './commentReducer';
import initialState from './commentInitialState';


const CommentProvider = (props) => {
    const [ state, dispatch ] = useReducer(CommentReducer, initialState);

    return (
        <CommentContext.Provider value={{state, dispatch}}>
            {props.children}
        </CommentContext.Provider>
    );
}

export default CommentProvider