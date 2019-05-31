import React, { useContext, useState } from 'react';
import { Menu, Grid, Image } from 'semantic-ui-react';
import * as ActionTypes from '../contexts/user/userActionTypes';
import { UserContext } from '../contexts/user/userReducer';
import { withRouter } from 'react-router-dom';
import userApi from '../api/users/userApi';
import uuid from 'uuid';
import * as utils from '../utils';
import * as styles from '../styles';
import Routes from '../Routes';


const Navbar = ({history}) => {

    const { state, dispatch } = useContext(UserContext);

    const [ showNavbar, setShowNavbar ] = useState(false);
    
    function handleClick(e) {
        e.stopPropagation();
        if(showNavbar)
            setShowNavbar(false);
        else 
            setShowNavbar(true);
    }

    async function logout(client) {
        await new userApi(client).logout();
        dispatch({type: ActionTypes.LOGOUT});
    }

    
    //IF the user is not logged in or if it's set to the login component the navbar will not be shown
    return (
        <Grid.Column style={{display: history.location.pathname !== '/' && state.currentUser ? 'flex' : 'none'}} width={4}>
            <Menu  fluid vertical tabular style={styles.navbarColumn}>
                <Menu.Item>
                    {
                        state.currentUser ?
                        <Image src={state.currentUser.avatar} rounded />
                        : null
                    }
                </Menu.Item>
                {
                    //Map over the routes, and if the user logged in.
                    Routes.map((route, i) => {
                        if(route.routeName !== "Post" && route.routeName !== 'User' && route.routeName !== "Login" && state.currentUser) 
                            return (
                                <Menu.Item key={i}  onClick={() => history.push(route.route)} >
                                    {utils.Ico(route.icon)}
                                </Menu.Item>
                            );
                    })
                }
                <Menu.Item onClick={e => logout(e, client)}>
                    {
                        state.currentUser ?
                        utils.Ico('signout')
                        : null
                    }
                </Menu.Item>

            </Menu>
        </Grid.Column>
    );
};

export default withRouter(Navbar);