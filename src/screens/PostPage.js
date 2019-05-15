import React, { useState, useEffect, useRef } from 'react';
import { Container, Segment, Header, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import * as utils from '../utils';
import postApi from '../api/posts/postApi';

const PostPage = ({match, client}) => {
    
    const ref = useRef();

    const [currentPost, setCurrentPost] = useState(null);
    
    const id = match.params.postId;

    async function getPost(client) {
        let subscriber,
            postData;
            
        if(navigator.onLine) {
            subscriber = await new postApi(client).getPost(id);
            subscriber.subscribe(({data}) => {
                setCurrentPost(data.post);
                console.log('currentPost-------------', currentPost);
            });
        } else {
            postData = await new postApi(client).getPostOffline(id);
            setCurrentPost(postData);
        }
        
    }

    useEffect(() => {
        getPost(client);
    }, null)

    useEffect(() => {
        cancelAnimationFrame(ref.current);
    }, null);

    return (
        <Container>
            <Segment>
                <Header as="h2">{currentPost.title}</Header>
                {JSON.stringify(currentPost)}
            </Segment>
            <Segment.Group>
                <Image src={currentPost.image} size="large" />
            </Segment.Group>
        </Container>
    );
};

export default withRouter(PostPage);