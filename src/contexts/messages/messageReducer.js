import React from 'react';
import initialState from './messageInitialState';
import * as MessageActionTypes from './messageActionTypes';
import * as utils from '../../utils';

//Define your context initial state.
export const MessageContext = React.createContext(initialState);

export const MessageReducer = (state=initialState, action) => {
    switch(action.type) {
        case MessageActionTypes.GET_MESSAGES:
            return utils.deepCopy({
                ...initialState,
                ...{ currentMessages: action.messages }
            });
        case MessageActionTypes.CREATE_MESSAGES:
            return utils.deepCopy({
                ...initialState,
                ...{ currentMessages: action.updatedMessages }
            });
        default:
            return state;
    }
}