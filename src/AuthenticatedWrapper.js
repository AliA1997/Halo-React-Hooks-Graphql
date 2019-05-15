import React from 'react';
import Navbar from './components/Navbar';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import Routes from './Routes';
import uuid from 'uuid';
import * as utils from './utils';
import * as styles from './styles';


function AuthenticatedWrapper(props) {
    const { currentUser } = props;
    const isUserLoggedIn = currentUser ? true : false;

    //If the length of the href is not equal to home route(/) then redirect to that route
    // if(!isUserLoggedIn && window.location.href.length !== 22) {
    //     window.location.href = window.location.href.split('').slice(0, 22).join('');
    // }
    return (
        <React.Fragment>
            <Navbar style={{background: 'linear-gradient(#FF70A6, #FF9770, #FFD670, #E9FF70)', height: '100vh'}}/>
            <Container style={{background: 'linear-gradient(#FF70A6, #FF9770, #FFD670, #E9FF70)', height: '100vh'}}>
                <Switch>
                    {Routes.map((route, i) => {
                        return (
                            <utils.setTitleRoute exact={route.exact} path={route.route} routeName={route.routeName} isPostPage={route.routeName === 'Post'} key={i}>  
                                <route.component />
                            </utils.setTitleRoute>
                        );
                    })
                    }
                </Switch>
            </Container>
        </React.Fragment>

    );
}

export default AuthenticatedWrapper;