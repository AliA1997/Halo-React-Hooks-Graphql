import React, { useContext, useEffect, useRef, useState, useReducer } from 'react';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import { PostContext } from '../contexts/post/postReducer';
import { UserContext } from '../contexts/user/userReducer';
import * as ActionTypes from '../contexts/post/postActionTypes';
import SearchBar from '../components/SearchBar';
import LoadingScreen from '../components/LoadingScreen';
import PostItem from '../components/PostItem';
import postsApi from '../api/posts/postApi';

const Dashboard = ({history}) => {

    const ref = useRef();

    const {state, dispatch}= useContext(PostContext);

    const userContext = useContext(UserContext);


    async function search(e, searchVal, client) {
        e.stopPropagation();
        try {
            let postsToRetrieve;

            const retrieveMyPosts = document.getElementById('my-posts-checkbox').checked

            if(searchVal && !retrieveMyPosts)
                postsToRetrieve = navigator.onLine ? await new postsApi(client).searchPosts(searchVal) : await new postsApi(client).searchPostsOffline(searchVal)
            else if(searchVal && retrieveMyPosts)
                postsToRetrieve = navigator.onLine ? await new postsApi(client).searchUserPosts(userContext.state.currentUser.id, searchVal) : await new postsApi(client).searchUserPostsOffline(searchVal);
            else if(!searchVal && retrieveMyPosts)
                postsToRetrieve = navigator.onLine ? await new postsApi(client).getUserPosts(userContext.state.currentUser.id) : await new postsApi(client).getUserPostsOffline(userContext.state.currentUser.id);
            else if(!searchVal && !retrieveMyPosts)
                postsToRetrieve = navigator.onLine ? await new postsApi(client).getAllPosts() : await new postsApi(client).getAllPostsOffline();

                // console.log('posts---------------', postsToRetrieve);

            dispatch({type: ActionTypes.GET_POSTS, posts: postsToRetrieve});

            
        } catch(error) {
            if(typeof error !== 'object')  
                toast.error(error, { position: toast.POSITION.TOP_RIGHT });
        }
    }

    async function getInitialPosts(client) {       
        try {
            const subscriber = navigator.onLine ? await new postsApi(client).getAllPosts() : await new postsApi(client).getAllPostsOffline();

            return subscriber.subscribe(({data}) => {
                if(data)
                    dispatch({type: ActionTypes.GET_POSTS, posts: data.posts});
            })

        } catch(error) {
            console.log('error------------', error);
            if(typeof error !== 'object')
                toast.error(error, { position: toast.POSITION.TOP_RIGHT });
        }
    }

    useEffect(() => {
        cancelAnimationFrame(ref.current);
    }, null)

    return (
        <ApolloConsumer>
            {client => {
                if(client) {

                    getInitialPosts(client);

                    return (
                        <div className="white-container">
                            <SearchBar client={client} searchFunc={search} />
                            <div className='white-subcontainer'>
                                {
                                    state.posts.length ?
                                    state.posts.map(post => <PostItem key={post.id} {...post} history={history}/>)
                                    : null
                                }
                            </div>
                        </div>
                    );
                }

                return <LoadingScreen />
            }}
        </ApolloConsumer>
    );
};

export default withRouter(Dashboard);