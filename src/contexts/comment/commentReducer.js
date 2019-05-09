import React from 'react';
import * as CommentActionTypes from './commentActionTypes';
import * as utils from '../../utils';
import commentInitialState from './commentInitialState';


export const CommentReducer = (state=commentInitialState, action) => {
    switch(action.type) {
        case CommentActionTypes.GET_MESSAGES:
            return utils.deepCopy({
                ...state,
                ...{ currentComments: action.messages }
            });
        case CommentActionTypes.CREATE_MESSAGES:
            return utils.deepCopy({
                ...state,
                ...{ currentComments: action.updatedMessages }
            });
        default:
            return state;
    }
}

export const CommentContext = React.createContext(commentInitialState, CommentReducer);
