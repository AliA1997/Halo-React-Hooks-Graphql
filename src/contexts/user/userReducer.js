import React from 'react';
import initialState from './userInitialState';
import * as UserActionTypes from './userActionTypes';
import * as utils from '../../utils';


export const UserReducer = (state=initialState, action) => {
    switch(action.type) {
        case UserActionTypes.LOGIN:
            return utils.deepCopy({
                ...initialState,
                ...{ currentUser: action.loggedInUser }
            });
        case UserActionTypes.LOGOUT:
            return utils.deepCopy({
                ...initialState,
                ...{ currentUser: null }
            });
        default:
            return state;
    }
}

//Define your context initial state.
export const UserContext = React.createContext(initialState, UserReducer);
