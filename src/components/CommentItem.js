import React, { useState } from 'react';
import { ApolloConsumer } from 'react-apollo';
import PropTypes from 'prop-types';
import * as commentApi from '../api/comments/commentApi';
import dateFns from 'date-fns';
import LoadingScreen from './LoadingScreen';

const CommentItem = ({id, postId, username, body, dateCreated, dateUpdated, currentUser}) => {

    const [currentEditedComment, setEditedComment] = useState('');

    const [doEdit, setDoEdit] = useState(false);

    function handleChange(e) {
        setEditedComment(e.target.value);
        return;
    }

    async function editComment(e, client) {
        e.stopPropagation();
        if(!doEdit) {
            setDoEdit(doEdit)
        } else {
            const commentToUpdate = {
                username,
                body: currentEditedComment ? currentEditedComment : body,
                dateCreated,
                dateUpdated: dateFns.format(new Date, 'MM/DD/YYYY hh::mm aa')   
            }

            await new commentApi(client).updateComment(id,  commentToUpdate);
            
            history.go();
        }
    }

    async function deleteComment(e, client) {
        e.stopPropagation();
        await new commentApi(client).deleteComment(postId, currentUser.id, id);
        history.go();
    }

    return (
        <ApolloConsumer>
            {client => {
                if(client)
                    return (
                        <div>
                            <h1>{username}</h1>
                            <p>{body}</p>
                            <p>{dateUpdated ? dateUpdated : dateCreated}</p>
                            <div className="user-comment-div" style={{display: username === currentUser.username ? 'flex' : 'none'}}>
                                <button onClick={e => deleteComment(e, client)}>
                                    Delete Comment   
                                </button>
                                <button onClick={e => editComment(e, client)}>
                                    Edit Comment
                                </button>
                                <textarea style={{display: doEdit ? 'initial' : 'none'}} rows="3" draggable={false} placeholder="Max 150 Characters...." 
                                    onChange={e => handleChange(e)} maxLength={150}>
                                </textarea>
                            </div>
                        </div>
                    );

                return <LoadingScreen />;
            }}
        </ApolloConsumer>
    );
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