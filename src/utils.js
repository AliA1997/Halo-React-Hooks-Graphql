import React from 'react';
import { Route } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

export const Roles  = { 
    Guest: 'Guest',
    LoggedInUser: 'Logged In User'
};

export function Icon(icon) {
    let iconToReturn = '';

    switch(icon) {
        case 'nav':
            iconToReturn = <FontAwesomeIcon icon='bars' className="mobile-icon"  onClick={e => arguments[1](e)}/>;
            break;        
        case 'home':
            iconToReturn = <FontAwesomeIcon icon='hotel' />;
            break;        
        case 'user':
            iconToReturn = <FontAwesomeIcon icon='user-cog' />;
            break;        
        case 'signin':
            iconToReturn = <FontAwesomeIcon icon='sign-in-alt' />;
            break;        
        case 'signout':
            iconToReturn = <FontAwesomeIcon icon="power-off" />;
            break;
        case 'doc':
            iconToReturn = <FontAwesomeIcon icon='file-alt' />;
            break;        
        case 'new-commment':
            iconToReturn = <FontAwesomeIcon icon='comment-alt' />;
            break;        
        case 'cancel-comment':
            iconToReturn = <FontAwesomeIcon icon='window-close' />;
            break;        
        case 'add-friend':
            iconToReturn = <FontAwesomeIcon icon='user-check' />;
            break;
        case 'search':
            iconToReturn = <FontAwesomeIcon icon="search" />;
        case 'srch-users':
            iconToReturn = <img src={searchUsersIcon} style={{height: '50px', width: '100px'}} />;
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
    comment: gql`
        fragment commentFields on Comment {
            __typename
            id
            postId
            username
            body
            dateCreated
            dateUpdated
            deletedInd
            permanentlyDeletedInd
        }
    `,
}
