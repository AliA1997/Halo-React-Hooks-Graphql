import React, {useContext, useRef, useEffect, Suspense } from 'react';
import Navbar from './components/Navbar';
import { Container, Grid, Loader } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import Routes from './Routes';
import uuid from 'uuid';
import * as utils from './utils';

function AuthenticatedWrapper(props) {
    // const { currentUser } = props;

    //If the length of the href is not equal to home route(/) then redirect to that route
    // if(!isUserLoggedIn && window.location.href.length !== 22) {
    //     window.location.href = window.location.href.split('').slice(0, 22).join('');
    // }
    return (
        <React.Fragment>
            <Grid>
                <Navbar style={{background: 'linear-gradient(#FF70A6, #FF9770, #FFD670, #E9FF70)', height: '100vh'}}/>
                <Grid.Column stretched width={12}  mobile>
                    <Container style={{background: 'linear-gradient(#FF70A6, #FF9770, #FFD670, #E9FF70)', height: '100vh', width: '100vw'}}>
                        <Suspense fallback={<Loader disabled />}>
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
                        </Suspense>
                    </Container>
                </Grid.Column>
            </Grid>
        </React.Fragment>

    );
}

export default AuthenticatedWrapper;