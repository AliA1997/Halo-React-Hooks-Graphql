import React from 'react';
import * as UserActionTypes from './userActionTypes';
import * as utils from '../../utils';
import userInitialState from './userInitialState';


export const UserReducer = (state=userInitialState, action) => {
    switch(action.type) {
        case UserActionTypes.LOGIN:
            localStorage.setItem('user', action.loggedInUserString);
            return utils.deepCopy({
                ...state,
                ...{ currentUser: action.loggedInUser }
            });
        case UserActionTypes.SET_USER:
            const userObj = JSON.parse(action.user);
            return utils.deepCopy({
                ...state,
                ...{ currentUser: userObj }
            })
        case UserActionTypes.LOGOUT:
            return utils.deepCopy({
                ...state,
                ...{ currentUser: null }
            });
        case UserActionTypes.GET_USERS:
            return utils.deepCopy({
                ...state,
                ...{ users: action.users }
            });
        default:
            return state;
    }
}

//Define your context initial state.
export const UserContext = React.createContext(userInitialState);
