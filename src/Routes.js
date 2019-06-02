import React from 'react';
//Use React.lazy to render a dynamic import as a component.
const LoginScreen = React.lazy(() => import('./screens/LoginPage'));
const Dashboard = React.lazy(() => import('./screens/Dashboard'));
const RegisterPage = React.lazy(() => import('./screens/RegisterPage'));
const PostPage = React.lazy(() => import('./screens/PostPage'))
const UsersPage = React.lazy(() => import('./screens/UsersPage'))
const UserPage = React.lazy(() => import('./screens/UserPage'))
const NewPostPage = React.lazy(() => import('./screens/NewPostPage'))
import * as utils from './utils';

const Routes = [
    {
        exact: true,
        route: '/',
        routeName: "Login",
        roles: [utils.Roles.Guest],
        icon: 'signin',
        component: LoginScreen
    },
    {
        exact: true,
        route: '/register',
        routeName: "Register",
        roles: [utils.Roles.Guest],
        icon: 'user',
        component: RegisterPage
    },
    {
        exact: true,
        route: '/dashboard',
        routeName: 'Dashboard',
        roles: [utils.Roles.LoggedInUser],
        icon: 'home',
        component: Dashboard
    },
    {
        exact: false,
        route: '/posts/:postId',
        routeName: 'Post',
        roles: [utils.Roles.LoggedInUser],
        icon: null,
        component: PostPage
    },
    {
        exact: true,
        route: '/new_post',
        routeName: "New Post",
        roles: [utils.Roles.LoggedInUser],
        icon: 'doc',
        component: NewPostPage
    },
    {
        exact: true,
        route: '/users',
        routeName: 'Search Users',
        roles: [utils.Roles.LoggedInUser],
        icon: 'srch-users',
        component: UsersPage
    },
    {
        exact: false,
        route: '/users/:userId',
        routeName: 'User',
        roltes: [utils.Roles.LoggedInUser],
        icon: null,
        component: UserPage
    }
];

export default Routes;