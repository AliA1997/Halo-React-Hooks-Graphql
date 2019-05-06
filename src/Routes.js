import React from 'react';
import LoginScreen from './screens/LoginPage';
import Dashboard from './screens/Dashboard';
import RegisterPage from './screens/RegisterPage';
import PostPage from './screens/PostPage';
import NewPostPage from './screens/NewPostPage';
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
        route: '/dashboard/:postId',
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
    }
];

export default Routes;