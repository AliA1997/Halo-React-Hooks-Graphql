import React, { useContext } from 'react';
import * as ActionTypes from '../contexts/user/userActionTypes';
import { UserContext } from '../contexts/user/userReducer';
import { withRouter } from 'react-router-dom';
import userApi from '../api/users/userApi';
import uuid from 'uuid';
import * as utils from '../utils';
import Routes from '../Routes';


const Navbar = ({history}) => {

    const { state, dispatch } = useContext(UserContext);
    
    async function logout(client) {
        await new userApi(client).logout();
        dispatch({type: ActionTypes.LOGOUT});
    }
    
    //IF the user is not logged in or if it's set to the login component the navbar will not be shown
    return (
        <div className="navbar" style={{display: history.location.pathname === '/' || !state.currentUser ? 'none' : 'initial'}}>
            {utils.Icon('nav')}
            {
                state.currentUser ?
                <img src={state.currentUser.avatar} id="user-avatar" />
                : null
            }
            {
                //Map over the routes, and if the user logged in.
                Routes.map(route => {
                    if(route.routeName !== "Post" && route.routeName !== "Login" && state.currentUser) 
                        return (
                            <a className='link' onClick={() => history.push(route.route)} key={uuid.v4()}>
                                {utils.Icon(route.icon)}
                                <p className='mobile-text'>{route.routeName}</p>
                            </a>
                        );
                })
            }
            {
                !state.currentUser ? 
                <a className='link' onClick={() => logout()}>
                    {utils.Icon('signout')}
                </a>
                : null
            }
        </div>
    );
};

export default withRouter(Navbar);