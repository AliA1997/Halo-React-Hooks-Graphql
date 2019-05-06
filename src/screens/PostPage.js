import React, { useState, useEffect } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import * as utils from '../utils';
import LoadingScreen from '../components/LoadingScreen';
import postApi from '../api/posts/postApi';

const PostPage = (props) => {
    
    const [currentPost, setCurrentPost] = useState(null);
    
    const { id } = props.match.params;

    async function getPost(client) {
        let postData;
        if(navigator.onLine) 
            postData = await new postApi(client).getPost(id).data.getPost;
        else 
            postData = await new postApi(client).getPost(id).data.getPost;
        
        setCurrentPost(postData);
    }

    return (
        <ApolloConsumer>
           {client => {
               if(client) {
                    getPost(client);
                    return (
                       <div>
                           {JSON.stringify(currentPost)}
                       </div>
                   )
               }
               return <LoadingScreen />
           }}
        </ApolloConsumer>
    );
};

export default withRouter(PostPage);