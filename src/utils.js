import React, { useEffect, useLayoutEffect } from 'react';
import { Icon, Image } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as ActionTypes from './contexts/user/userActionTypes';
import searchUsersIcon from './searchUsersIcon.svg';
import gql from 'graphql-tag';

export const deepCopy = (obj) => {

    if(obj === null || obj === undefined) {
        return null;
    }
    //Define the new object that will be returned.
    let newObj = {};

    //Get the keys of the object passed in to be looped through and to assign to newObj or recursively call to assign a object to a property of your newObj.
    const keys = Object.keys(obj);
    
    //Loop through your keys.
    for(let i = 0; i < keys.length; i++) {
        //Assign a variable to your key to make it more readable.
        const key = keys[i];
        //If the current is an array then copy the array removing the reference.
        //Else If current key is an object then recursively call the function copying that object.
        //Else assign it like any other property.
        if(Array.isArray(obj[key]))
            newObj[key] = obj[key].slice();
        else if(typeof obj[key] === 'object') 
            newObj[key] = deepCopy(obj[key]);
         else 
            newObj[key] = obj[key];
    }

    //After the for loop return your newObject.
    return newObj;
}

//Ajax Related info that will used through out ajaxCallCreators
export const defaultMediaType = 'application/json';

export const statusCodes = {
    ok: 200,
    created: 201,
    noContent: 204,
    badRequest: 400,
    serverError: 500
}

export function setTitleRoute(props) {
    const {routeName, isPostPage, exact, path, id } = props;
    return (
        <Route path={path} exact={exact} render={() => {
            if(isPostPage) 
                document.title = `Halo - Post - ${id}`
            else
                document.title = `Halo - ${routeName}`;
            //Then clone the element that clones the children.
            return (
                <ApolloConsumer>
                    {client => {
                        if(client) {
                            const propsToPass = { ...props, ...{ client: client } }
                            return React.cloneElement(props.children, propsToPass)
                        }
                    }}
                </ApolloConsumer>
            )
        }}/>
    )
}

export function setDocTitle(title) {
    document.title = `Halo ${title}`;
}

//If the browser is running use layout effect since it's synchronous with browser else use useEffect.
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;


//Get the browser dimensions
export function getBrowserWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

export const Roles  = { 
    Guest: 'Guest',
    LoggedInUser: 'Logged In User'
};

export function Ico(icon) {
    let iconToReturn = '';

    switch(icon) {
        case 'nav':
            iconToReturn = <FontAwesomeIcon icon='bars' className="mobile-icon"  onClick={e => arguments[1](e)}/>;
            break;        
        case 'home':
            iconToReturn = <Icon name="home" size="huge"/>;
            break;        
        case 'user':
            iconToReturn = <Icon icon='settings' size="huge"/>;
            break;        
        case 'signin':
            iconToReturn = <Icon name='sign in' size="huge"/>;
            break;        
        case 'signout':
            iconToReturn = <Icon name="power off" size="huge"/>;
            break;
        case 'doc':
            iconToReturn = <Icon name='file alternate' size="huge"/>;
            break;        
        case 'new-commment':
            iconToReturn = <Icon name='comment' size="huge"/>;
            break;        
        case 'cancel-comment':
            iconToReturn = <Icon name='cancel' size="huge"/>;
            break;        
        case 'add-friend':
            iconToReturn = <Icon name='add user' size="huge"/>;
            break;
        case 'search':
            iconToReturn = <Icon name="search" size="huge"/>;
        case 'srch-users':
            iconToReturn = <Icon name='users'size="huge"/>;
        default:   
            break;
    }
    return iconToReturn;
}

export const fragments = {
    user: gql`
        fragment userItemFields on UserItem {
            __typename 
            id
            username
            avatar
            dateRegistered
        }
    `,
    post: gql`
        fragment postItemFields on PostItem {
            __typename
            id
            title
            image
            dateCreated
        }
    `,
    postPage: gql`
        fragment postFields on Post {
            __typename
            id
            title
            image
            dateCreated
            tags
            deletedInd   
        }
    `,
    comment: gql`
        fragment commentFields on Comment {
            __typename
            id
            postId
            username
            avatar
            body
            dateCreated
            dateUpdated
            deletedInd
            permanentlyDeletedInd
        }
    `,
}

export function checkUserLoggedIn(state, dispatch) {
    const userInLocalStorage = localStorage.getItem('user');
    if(!state.currentUser || state.currentUser != userInLocalStorage) {
        dispatch({type: ActionTypes.SET_USER, user: userInLocalStorage});
    }
    return;
}