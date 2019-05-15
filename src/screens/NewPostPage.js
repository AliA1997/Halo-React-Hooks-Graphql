import React, { useState, useContext } from 'react';
import { Form, FormField, Input, Image, Icon, Select, Segment, Header, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { UserContext } from '../contexts/user/userReducer';
import postApi from '../api/posts/postApi';
import * as utils from '../utils';
import * as styles from '../styles';
import dateFns from 'date-fns';
import _ from 'lodash';
import data from '../tags.json';
import TagItem from '../components/TagItem';

const NewPostPage = ({history, client}) => {

    const { state, dispatch } = useContext(UserContext);

    if(!state.currentUser) 
        history.push('/');

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

    async function createPost(e, currentClient) {
        e.stopPropagation();
        newPostForm.dateCreated = dateFns.format(new Date(), 'MM/DD/YYYY hh:mm aa');
        console.log('newPostForm_-------------', newPostForm);
        const postRes = await new postApi(currentClient).createPost(currentUser.id, newPostForm);
        console.log('postRes---------', postRes);
    }
    
    return (
        <React.Fragment>
            
            <Segment>
                <Header as="h2">Create New Post</Header>
            </Segment>

            <Segment>
                <Form onSubmit={e => createPost(e, client)}>
                    <FormField>
                        Title
                1       <Input value={setNewPostForm.title} onChange={e => handleChange(e, 'title')} placeholder="New Post Title..." />
                    </FormField> 
                    <Image src={setNewPostForm.image || 'https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image'}  />
                    <FormField>
                        Post Image
                        <Input value={setNewPostForm.image} onChange={e => handleChange(e, 'image')} placeholder="New Post Image..."/>
                    </FormField>
                    <FormField>

                        <Select onSelect={e => setCurrentTagValue(e.target.value)} options={data.tags} />
                        <Button onClick={e => addTags(e, currentTag)} color="green">
                            Add
                            <Icon name="plus" style={styles.icon}/>
                        </Button>

                    </FormField>
                    <Segment.Group>
                        <Header>Tags Selected:</Header>
                        {
                            newPostForm.tags.length ? 
                                newPostForm.tags.map((tag, i) => (
                                    <TagItem tag={tag} onClick={e => removeTag(e, i)} />
                                ))
                                : null
                        }
                    </Segment.Group>
                    <Button type="submit" primary>
                        Create Post
                    </Button>
                </Form>
            </Segment>
        </React.Fragment>
    );
};

export default withRouter(NewPostPage);