import React, { useContext, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import { PostContext } from '../contexts/post/postReducer';
import * as ActionTypes from '../contexts/post/postActionTypes';
import SearchBar from '../components/SearchBar';
import LoadingScreen from '../components/LoadingScreen';
import PostItem from '../components/PostItem';
import postsApi from '../api/posts/postApi';

const Dashboard = ({history}) => {

    const ref = useRef();

    const context = useContext(PostContext);

    alert(JSON.stringify(context));

    async function search(e, searchVal, client) {
        e.stopPropagation();
        try {
            let postsToRetrieve;

            const retrieveMyPosts = document.getElementById('my-posts-checkbox').checked

            if(searchVal && !retrieveMyPosts)
                postsToRetrieve = navigator.onLine ? await new postsApi(client).searchPosts(searchVal) : await new postsApi(client).searchPostsOffline(searchVal)
            else if(searchVal && retrieveMyPosts)
                postsToRetrieve = navigator.onLine ? await new postsApi(client).searchUserPosts(state.currentUser.id, searchVal) : await new postsApi(client).searchUserPostsOffline(searchVal);
            else if(!searchVal && retrieveMyPosts)
                postsToRetrieve = navigator.onLine ? await new postsApi(client).getUserPosts(state.currentUser.id) : await new postsApi(client).getUserPostsOffline(state.currentUser.id);
            else if(!searchVal && !retrieveMyPosts)
                postsToRetrieve = navigator.onLine ? await new postsApi(client).getAllPosts() : await new postsApi(client).getAllPostsOffline();

                console.log('posts---------------', postsToRetrieve);

            // dispatch({type: ActionTypes.GET_POSTS, posts: postsToRetrieve});

            
        } catch(error) {
            if(typeof error !== 'object')  
                toast.error(error, { position: toast.POSITION.TOP_RIGHT });
        }
    }

    async function getInitialPosts(client) {
        
        let postsToRetrieve;
        
        try {
            postsToRetrieve = navigator.onLine ? await new postsApi(client).getAllPosts() : await new postsApi(client).getAllPostsOffline();

            dispatch({tyep: ActionTypes.GET_POSTS, posts: postsToRetrieve});
        } catch(error) {
            if(typeof error !== 'object')
                toast.error(error, { position: toast.POSITION.TOP_RIGHT });
        }
    }

    // useEffect(() => {
    //     cancelAnimationFrame(ref.current);
    // }, null)

    return (
        <ApolloConsumer>
            {client => {
                if(client) {

                    getInitialPosts(client);

                    return (
                        <div class="white-container">
                            <SearchBar client={client} searchFunc={search} />
                            <div className='white-subcontainer'>
                                {/* {
                                    state.posts.length ?
                                    state.posts.map(post => <PostItem key={post.id} {...post} history={history}/>)
                                    : null
                                } */}
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