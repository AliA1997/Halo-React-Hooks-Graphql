import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import UserProvider from './contexts/user/UserProvider';
import PostProvider from './contexts/post/PostProvider';
import CommentProvider from './contexts/comment/CommentProvider';
import { createBrowserHistory } from 'history';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
const App = React.lazy(() => import('./App'));
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHotel, faFileAlt, faSignInAlt, faCommentAlt, faWindowClose, faPlusCircle, faUserCog, faUserCheck, faPowerOff, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import './App.css';
// import './sass/app.scss';

//Add icon classes to be used for font-awesome icons.
library.add(faHotel, faFileAlt, faSignInAlt, faCommentAlt, faWindowClose, faPlusCircle, faUserCog, faUserCheck, faPowerOff, faBars, faSearch);

const client = new ApolloClient({
    //In order to pass session to server make sure to set your credentials for graphql client.
    link: new HttpLink({uri: `http://localhost:4555/graphql`, useGETForQueries: true, credentials: 'same-origin'}),
    cache: new InMemoryCache({addTypename: false}).restore(window.__APOLLO_CLIENT__),
    ssrForceFetchDelay: 200
});

//Define our browser history
const history = createBrowserHistory();

render(<ApolloProvider client={client}>
            <Router history={history}>
                <React.Suspense fallback={<Loader disabled />} >
                    <UserProvider>
                        <PostProvider>
                            <CommentProvider>
                                <App /> 
                            </CommentProvider>
                        </PostProvider>
                    </UserProvider>
                </React.Suspense>
            </Router>
        </ApolloProvider>, document.getElementById("root"));