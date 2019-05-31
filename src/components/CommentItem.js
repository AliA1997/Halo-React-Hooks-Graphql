import React, { useState } from 'react';
import { Comment, TextArea, Loader, Image, Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import commentApi from '../api/comments/commentApi';
import dateFns from 'date-fns';
import userPlaceholder from '../user-placeholder.png';
import * as styles from '../styles';

const CommentItem = ({id, postId, username, avatar, body, dateCreated, dateUpdated, client, getComments, currentUser}) => {

    const [currentEditedComment, setEditedComment] = useState('');

    // console.log('username-------------', username);

    const [doEdit, setDoEdit] = useState(false);

    function handleChange(e) {
        setEditedComment(e.target.value);
        return;
    }

    async function editComment(e) {
        e.stopPropagation();
        if(!doEdit) {
            setDoEdit(true);
            // console.log('doEdit----------------', doEdit);
        } else {
            const commentToUpdate = {
                username,
                body: currentEditedComment ? currentEditedComment : body,
                dateCreated,
                dateUpdated: dateFns.format(new Date(), 'MM/DD/YYYY hh::mm aa')   
            };

            await new commentApi(client).updateComment(id,  commentToUpdate);
            
            setDoEdit(false);

            getComments();
        }
    }

    async function deleteComment(e) {
        e.stopPropagation();
        if(confirm("Sure you want to delete this comment.")) {
            await new commentApi(client).deleteComment(postId, currentUser.id, id);
            getComments();
        }
    }

    const currentUserUsername = currentUser ? currentUser.username : 'Guest';

    const date = dateUpdated ? dateUpdated : dateCreated;

    if(username)     
        return (
            <Comment style={{display: 'flex'}}>
                <Comment.Avatar src={avatar || userPlaceholder} as="div" style={{width: '50px'}} />
                <Comment.Content style={{width: '150px'}}>
                    <Comment.Author as="a">{username || ''}</Comment.Author>
                    <Comment.Text>{body || ''}</Comment.Text>
                    <Comment.Metadata>
                        <div>
                            {date}
                        </div>
                    </Comment.Metadata>
                </Comment.Content>

                <Comment.Actions style={{display: username === currentUserUsername ? 'flex' : 'none', flexDirection: 'column'}}>

                    <Comment.Action onClick={e => deleteComment(e)}>
                        <Label color="red" style={styles.commentActionWidth} >
                            Delete Comment<Icon name="cancel" style={styles.commentActionIcon}/>   
                        </Label>
                    </Comment.Action>

                    <Comment.Action onClick={e => editComment(e)}>
                        <Label color="blue" style={styles.lastCommentAction} f>
                            Edit Comment<Icon name="edit" style={styles.lastCommentActionIcon}/>   
                        </Label>
                    </Comment.Action>
                    <TextArea style={{display: doEdit ? 'initial' : 'none'}} rows="3" draggable={false} placeholder="Max 150 Characters...." onChange={e => handleChange(e)} maxLength={150}/>
                </Comment.Actions>
            </Comment>
        );
    else 
        return <Loader disabled />
};

CommentItem.propTypes = {
    id: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
    dateUpdated: PropTypes.string,
    currentUser: PropTypes.object
}

export default CommentItem;