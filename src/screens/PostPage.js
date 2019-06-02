import React, { useState, useEffect, useLayoutEffect, useContext, useRef } from 'react';
import { Container, Segment, Header, Image, Icon, Loader, FormField, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import * as utils from '../utils';
const CommentSection = React.lazy(() => import('../components/CommentSection'))
import postApi from '../api/posts/postApi';
import postPlaceholder from '../postPlaceholder.jpg';
import { UserContext } from '../contexts/user/userReducer';
import * as ActionTypes from '../contexts/user/userActionTypes';

const PostPage = ({match, client}) => {
    
    const ref = useRef();

    const [currentPost, setCurrentPost] = useState(null);

    const [currentComments, setCurrentComments] = useState([]);

    const { state, dispatch } = useContext(UserContext)

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if(state && !state.currentUser) 
            dispatch({type: ActionTypes.SET_USER, user: userString})
    }, null)

    
    console.log('state---------------', state.currentUser)

    const id = match.params.postId;

    console.log('id----------------', id);

    async function getPost(client) {
        let subscriber,
            postData;
            
        if(navigator.onLine) {
            subscriber = await new postApi(client).getPost(id);
            subscriber.subscribe(({data}) => {

                if(data && data.post) 
                    setCurrentPost(data.post);
    
            });
        } else {
            postData = await new postApi(client).getPostOffline(id);
            setCurrentPost(postData);
        }
        
    }

    
    useEffect(() => {
        getPost(client);
        if(currentPost && currentPost.title)
            utils.setDocTitle(`Post - ${currentPost.title}`);
    }, null)

    useEffect(() => {
        cancelAnimationFrame(ref.current);
    }, null);

    if(currentPost && currentPost.id === id)
        return (
            <Container>
                <Segment>
                    <Header as="h2">{currentPost.title}</Header>
                </Segment>
                <Segment.Group>
                    <Image src={currentPost.image || postPlaceholder} size="large" />
                </Segment.Group>
                <Segment>
                    <Segment.Group>
                        <Header>
                            Comments
                            <Icon name="quote right" />
                        </Header>
                        <CommentSection client={client}  postId={id} />
                    </Segment.Group>
                </Segment>
            </Container>
        );
    else 
        return (
            <Loader disabled />
        );
};

export default withRouter(PostPage);