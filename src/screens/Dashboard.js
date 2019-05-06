import React, { useContext, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { ApolloConsumer } from 'react-apollo';
import { PostContext } from '../contexts/post/postReducer';
import * as ActionTypes from '../contexts/post/postActionTypes';
import SearchBar from '../components/SearchBar';
import LoadingScreen from '../components/LoadingScreen';
import postsApi from '../api/posts/postApi';

const Dashboard = (props) => {

    const ref = useRef();

    const { state, dispatch } = useContext(PostContext);

    async function search(e, searchVal, client) {
        e.stopPropagation();
        try {
            let postsToRetrieve;

            const retrieveMyPosts = document.getElementById('my-posts-checkbox').checked

            if(searchVal && !retrieveMyPosts)
                postsToRetrieve = navigator.onLine ? new postsApi(client).searchPosts(searchVal) : new postsApi(client).searchPostsOffline(searchVal)
            else if(searchVal && retrieveMyPosts)
                postsToRetrieve = navigator.onLine ? new postsApi(client).searchUserPosts(state.currentUser.id, searchVal) : new postsApi(client).searchUserPostsOffline(searchVal);
            else if(!searchVal && retrieveMyPosts)
                postsToRetrieve = navigator.onLine ? new postsApi(client).getUserPosts(state.currentUser.id) : new postsApi(client).getUserPostsOffline(state.currentUser.id);
            else if(!searchVal && !retrieveMyPosts)
                postsToRetrieve = navigator.onLine ? new postsApi(client).getAllPosts() : new postsApi(client).getAllPostsOffline();

            dispatch({type: ActionTypes.GET_POSTS, posts: postsToRetrieve});
            
        } catch(error) {
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
                if(client)
                    return (
                        <div>
                            <SearchBar />
                            <div className='white-subcontainer'>
                                
                            </div>
                        </div>
                    );

                return <LoadingScreen />
            }}
        </ApolloConsumer>
    );
};

export default Dashboard;