import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router';
import { UserContext } from '../contexts/user/userReducer';
import postApi from '../api/posts/postApi';
import * as utils from '../utils';
import dateFns from 'date-fns';
import _ from 'lodash';
import { ApolloConsumer } from 'react-apollo';
import LoadingScreen from '../components/LoadingScreen';
import data from '../tags.json';
import TagItem from '../components/TagItem';
import Toast from '../components/Toast';

const NewPostPage = (props) => {

    const { state, dispatch } = useContext(UserContext);

    if(!state.currentUser) 
        props.history.push('/');

    const [newPostForm, setNewPostForm] = useState({
                                    userId: state.currentUser.id,
                                    title: '',
                                    image: '',
                                    tags: []
                                });
                            
    const [currentTag, setCurrentTag] = useState('');

    console.log('currentUser----------------', state.currentUser);

    function addTags(e, tag) {
        e.stopPropagation();

        const form = utils.deepCopy(newPostForm)

        if(!form.tags.includes(tag))
            form.tags.push(tag)
            // form = _.uniq(form.tags);
        setNewPostForm(form);
    }

    function setCurrentTagValue(tag) {
        setCurrentTag(tag);
    }

    function removeTag(e, tagIndex) {
        e.stopPropagation();
        const form = utils.deepCopy(newPostForm);

        form.tags.splice(tagIndex, 1);

        setNewPostForm(form);
    }

    function handleChange(e, type) {
        e.stopPropagation();
        const form = utils.deepCopy(newPostForm);
        form[type] = e.target.value;
        setNewPostForm(form);
    }

    async function createPost(e, client) {
        e.stopPropagation();
        newPostForm.dateCreated = dateFns.format(new Date(), 'MM/DD/YYYY hh:mm aa');
        const postRes = await postApi(client).createPost(currentUser.id, newPostForm);
        console.log('postRes---------', postRes);
    }
    return (
        <ApolloConsumer>
            {client => {
                if(client) 
                    return (
                        <div className="new-post-container">
                            <h2>Create New Post</h2>
                            <div class="input-group">
                                <label>Title</label>
                                <input value={setNewPostForm.title} onChange={e => handleChange(e, 'title')} />
                            </div>
                            <img src={setNewPostForm.image || 'https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image'} className="new-post-image" />
                            <div className="input-group">
                                <label>Post Image</label>
                                <input value={setNewPostForm.image} onChange={e => handleChange(e, 'image')}/>
                            </div>
                            <select onSelect={e => setCurrentTagValue(e.target.value)}>
                                <option value="" selected></option>
                                {data.tags.map(tag => <option value={tag}>{tag}</option>)}
                            </select>
                            <button onClick={e => addTags(e, currentTag)}>Add+</button>
                            <div>
                                <h2>Tags Selected:</h2>
                                {
                                    newPostForm.tags.length ? 
                                        newPostForm.tags.map((tag, i) => (
                                            <TagItem tag={tag} onClick={e => removeTag(e, i)} />
                                        ))
                                        : null
                                }
                            </div>
                        </div>
                    );
            
                return <LoadingScreen />
            }}
        </ApolloConsumer>
    );
};

export default withRouter(NewPostPage);