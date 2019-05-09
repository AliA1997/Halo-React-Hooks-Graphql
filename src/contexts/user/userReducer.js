import React from 'react';
import * as UserActionTypes from './userActionTypes';
import * as utils from '../../utils';
import userInitialState from './userInitialState';


export const UserReducer = (state=userInitialState, action) => {
    switch(action.type) {
        case UserActionTypes.LOGIN:
            return utils.deepCopy({
                ...state,
                ...{ currentUser: action.loggedInUser }
            });
        case UserActionTypes.LOGOUT:
            return utils.deepCopy({
                ...state,
                ...{ currentUser: null }
            });
        default:
            return state;
    }
}

//Define your context initial state.
export const UserContext = React.createContext(userInitialState, UserReducer);
