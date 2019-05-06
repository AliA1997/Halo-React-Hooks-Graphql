import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import UserProvider from './contexts/user/UserProvider';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHotel, faFileAlt, faSignInAlt, faCommentAlt, faWindowClose, faPlusCircle, faUserCog, faUserCheck, faPowerOff, faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import './sass/app.scss';

//Add icon classes to be used for font-awesome icons.
library.add(faHotel, faFileAlt, faSignInAlt, faCommentAlt, faWindowClose, faPlusCircle, faUserCog, faUserCheck, faPowerOff, faBars, faSearch);

const client = new ApolloClient({
    link: new HttpLink({uri: `http://localhost:4555/graphql`, useGETForQueries: true}),
    cache: new InMemoryCache({addTypename: false})
});

//Define our browser history
const history = createBrowserHistory();

render(<ApolloProvider client={client}>
            <Router history={history}>
                <UserProvider>
                    <App />
                </UserProvider>
            </Router>
        </ApolloProvider>, document.getElementById("root"));