import React from 'react';
import initialState from './postInitialState';
import * as PostActionTypes from './postActionTypes';
import * as utils from '../../utils';

//Define your context initial state.
export const PostContext = React.createContext(initialState);

export const PostReducer = (state=initialState, action) => {
    switch(action.type) {
        case PostActionTypes.GET_POSTS:
            return utils.deepCopy({
                ...initialState,
                ...{
                    posts: action.posts
                }
            })
        case PostActionTypes.GET_POST:
            return utils.deepCopy({
                ...initialState,
                ...{ currentPost: action.post }
            });
        case PostActionTypes.CREATE_POST:
            return utils.deepCopy({
                ...initialState,
                ...{ posts: action.updatedPosts }
            });
        case PostActionTypes.UPDATE_POST:
            return utils.deepCopy({
                ...initialState,
                ...{ posts: action.updatedPosts }
            });
        case PostActionTypes.DELETE_POST:
            return utils.deepCopy({
                ...initialState,
                ...{ posts: action.updatedPosts }
            });
        default:
            return state;
    }
}