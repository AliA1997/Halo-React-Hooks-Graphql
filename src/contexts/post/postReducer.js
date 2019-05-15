import React from 'react';
import * as PostActionTypes from './postActionTypes';
import * as utils from '../../utils';
import postInitialState from './postInitialState';


export const PostReducer = (state=postInitialState, action) => {
    console.log('action--------------', action);
    switch(action.type) {
        case PostActionTypes.GET_POSTS:
            console.log('action---------------', action.posts);
            return utils.deepCopy({
                ...state,
                ...{
                    posts: action.posts
                }
            })
        case PostActionTypes.GET_POST:
            return utils.deepCopy({
                ...state,
                ...{ currentPost: action.post }
            });
        case PostActionTypes.CREATE_POST:
            return utils.deepCopy({
                ...state,
                ...{ posts: action.updatedPosts }
            });
        case PostActionTypes.UPDATE_POST:
            return utils.deepCopy({
                ...state,
                ...{ posts: action.updatedPosts }
            });
        case PostActionTypes.DELETE_POST:
            return utils.deepCopy({
                ...state,
                ...{ posts: action.updatedPosts }
            });
        default:
            return state;
    }
}

//Define your context initial state.
export const PostContext = React.createContext(postInitialState);


