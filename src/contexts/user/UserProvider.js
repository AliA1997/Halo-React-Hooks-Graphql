import React, { useReducer } from 'react';
import userInitState from './userInitialState';
import { UserContext, UserReducer } from './userReducer';

const UserProvider = (props) => {
    const [state, dispatch] = useReducer(UserReducer, userInitState);
    return (
        <UserContext.Provider value={{state, dispatch}}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;