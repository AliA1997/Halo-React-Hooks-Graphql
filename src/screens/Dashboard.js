import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container, Segment, Header, Button, Loader } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { PostContext } from '../contexts/post/postReducer';
import { UserContext } from '../contexts/user/userReducer';
import * as ActionTypes from '../contexts/post/postActionTypes';
import SearchBar from '../components/SearchBar';
import PostItem from '../components/PostItem';
import postsApi from '../api/posts/postApi';
import * as utils from '../utils';

const getPostsQuery = gql`
    ${utils.fragments.post}
    query {
        posts:getAllPosts {
            ...postItemFields
        }
    }
`;

const Dashboard = ({history, client}) => {

    const ref = useRef();

    const {state, dispatch} = useContext(PostContext);

    
    const userContext = useContext(UserContext);
    
    const userState = userContext.state;
    
    utils.useIsomorphicLayoutEffect(() => {
        if(!userState.currentUser)
            history.push('/');
    }, null);

    console.log('userState-------------', userState);

    const [ currentPosts, setPosts ] = useState([]);

    async function search(e, searchVal) {
        e.stopPropagation();
        try {
            let postsToRetrieve, 
                subscriber;

            const retrieveMyPosts = document.getElementById('my-posts-checkbox').checked

            if(searchVal && !retrieveMyPosts)
                subscriber = navigator.onLine ? await new postsApi(client).searchPosts(searchVal) : await new postsApi(client).searchPostsOffline(searchVal)
            else if(searchVal && retrieveMyPosts)
                subscriber = navigator.onLine ? await new postsApi(client).searchUserPosts(userContext.state.currentUser.id, searchVal) : await new postsApi(client).searchUserPostsOffline(searchVal);
            else if(!searchVal && retrieveMyPosts)
                subscriber = navigator.onLine ? await new postsApi(client).getUserPosts(userContext.state.currentUser.id) : await new postsApi(client).getUserPostsOffline(userContext.state.currentUser.id);
            else if(!searchVal && !retrieveMyPosts)
                subscriber = navigator.onLine ? await new postsApi(client).getAllPosts() : await new postsApi(client).getAllPostsOffline();


            subscriber.subscribe(({data}) => {
                if(data && data.posts) {
                    postsToRetrieve = data.posts;
                    dispatch({type: ActionTypes.GET_POSTS, posts: postsToRetrieve});
                }
            });

            
        } catch(error) {
            if(typeof error !== 'object')  
                toast.error(error, { position: toast.POSITION.TOP_RIGHT });
        }
    }
    

    useEffect(() => {
        cancelAnimationFrame(ref.current);
    }, null)

    return (
        <Query
            query={getPostsQuery}
        >
            {({data, error}) => {
                if(error)
                    console.log('error---------------', error)

                if(data && data.posts) {
                    return (
                        <Container>
                            <Segment>
                                <Header as="h2">{userState.currentUser.username} Dashboard</Header>
                            </Segment>
                            <SearchBar client={client} searchFunc={search} type="posts" />
                            <Segment>
                                <Container id="items-container">
                                    {
                                        state.posts.length ?
                                        state.posts.map(post => <PostItem key={post.id} {...post} history={history}/>)
                                        : data.posts.map(post => <PostItem key={post.id} {...post} history={history}/>)
                                    }
                                </Container>
                            </Segment>
                        </Container>
                    );
                }
                return <Loader disabled />
            }}
        </Query>
    );
    
};

export default withRouter(Dashboard);