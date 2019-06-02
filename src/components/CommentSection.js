import React, { useState, useEffect, useContext } from 'react';
import { Segment, Form, FormField, Input, Loader, Button, Label, Comment } from 'semantic-ui-react';
import { UserContext } from '../contexts/user/userReducer';
import dateFns from 'date-fns';
const CommentItem = React.lazy(() => import('./CommentItem'));
import commentApi from '../api/comments/commentApi';
import { toast } from 'react-toastify';

const CommentSection = ({client, postId}) => {

    const { state, dispatch } = useContext(UserContext);

    const [createCommentValue, setCreateCommentValue] = useState('');

    const [currentComments, setCurrentComments] = useState([]);

    function handleChange(e) {
        setCreateCommentValue(e.target.value);
    }
 
    async function getComments() {
        //Define subscriber and comment data.
        let subscriber,
            commentData;

        if(navigator.onLine){
            subscriber = await new commentApi(client).getComments(postId);
            subscriber.subscribe(({data}) => {
                //Set comments--------------------------
                if(data && data.comments.length)
                    setCurrentComments(data.comments);
                    //If there are existing comments, and no data set your comment to an empty array
                else if(currentComments.length)
                    setCurrentComments([]);
                //Log comments for debugging--------------------
            // console.log('currentComments---------------', currentComments);
            });
        } else {
            subscriber = await new commentApi(client).getCommentsOffline(postId);
            subscriber.subscribe(({data}) => {
                //Set Comments
                if(data && data.comments.length) 
                    setCurrentComments(data.comments);
                else if(currentComments.length)
                    setCurrentComments([]);
                // console.log('currentComments offline---------------', currentComments)
            });

        }
    }
    console.log('postId-------------', postId)

    async function createComment(e) {
        e.stopPropagation();
        //Define subscriber and comment data.
        const commentToAdd = { 
            postId,
            username: state.currentUser && state.currentUser.username,
            avatar: state.currentUser && state.currentUser.avatar,
            body: createCommentValue,
            dateCreated: dateFns.format(new Date(), 'MM/DD/YYYY hh:mm aa')
        };

        
        console.log("commentToAdd-----------", commentToAdd);

        await new commentApi(client).createComment(commentToAdd);
        
        toast.success('Comment Created Successfully!', { position: toast.POSITION.TOP_RIGHT });

        getComments();
    }

    useEffect(() => {
        getComments();
    }, []);

    return (
        <Segment>
            <Form onSubmit={createComment}>
                <FormField>
                    <Label>
                        Create Comment
                    </Label>
                </FormField>
                <FormField>
                    <Input onChange={handleChange} value={createCommentValue} />
                    <Button type="submit">
                        Submit
                    </Button>
                </FormField>
            </Form>
            <Comment.Group>
                {
                    currentComments.length ?
                    currentComments.map((comm, i) => <CommentItem key={i} {...comm} client={client} getComments={getComments} currentUser={state.currentUser}/>)
                    : <Loader disabled />
                }
            </Comment.Group>
        </Segment>
    
    );
}

export default CommentSection;