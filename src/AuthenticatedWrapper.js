import React from 'react';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import Routes from './Routes';
import uuid from 'uuid';
import * as utils from './utils';


function AuthenticatedWrapper(props) {
    const { currentUser } = props;
    const isUserLoggedIn = currentUser ? true : false;

    //If the length of the href is not equal to home route(/) then redirect to that route
    if(!isUserLoggedIn && window.location.href.length !== 22) {
        window.location.href = window.location.href.split('').slice(0, 22).join('');
    }
    return (
        <React.Fragment>
            <Navbar />
            <div className='route-container'>
                <Switch>
                    {Routes.map((route, i) => {
                        return (
                            <utils.setTitleRoute exact={route.exact} path={route.route} routeName={route.routeName} isPostPage={route.routeName === 'Post'} key={i}>  
                                <route.component {...props} />
                            </utils.setTitleRoute>
                        );
                    })
                    }
                </Switch>
            </div>
        </React.Fragment>

    );
}

export default AuthenticatedWrapper;