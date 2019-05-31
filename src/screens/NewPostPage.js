import React, { useState, useContext, useLayoutEffect } from 'react';
import { Form, FormField, Input, Image, Icon, Segment, Header, Button, Search, Label, Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { UserContext } from '../contexts/user/userReducer';
import postApi from '../api/posts/postApi';
import * as utils from '../utils';
import * as styles from '../styles';
import dateFns from 'date-fns';
import _ from 'lodash';
import data from '../tags.json';
import TagItem from '../components/TagItem';
import Dropzone from '../components/Dropzone';
import postPlaceholder from '../postPlaceholder.jpg';

const NewPostPage = ({history, client}) => {

    const { state, dispatch } = useContext(UserContext);

    utils.useIsomorphicLayoutEffect(() => {

        if(!state.currentUser) 
          history.push('/');

    }, null)

    const [newPostForm, setNewPostForm] = useState({
                                    userId: '',
                                    title: '',
                                    image: '',
                                    tags: []
                                });
                            
    const [currentTag, setCurrentTag] = useState('');

    const [tags, setTags] = useState(data.tags);

    function addTags(e, tag) {
        e.stopPropagation();

        console.log('e-----------------addTags', e);
        setTimeout(function() {

            const origTags = _.filter(tags.slice(), tg => tg.value !== tag);
    
            const form = utils.deepCopy(newPostForm)

            var itemToRetrieve = _.filter(tags.slice(), t => t.value === tag)[0];
    
    
            console.log('origTag----------------', origTags);

            console.log('itemToRetrieve-------------', itemToRetrieve);
    
            if(!form.tags.includes(itemToRetrieve))
                form.tags.push(itemToRetrieve);
            
            setNewPostForm(form);
            setTags(origTags)
        }, 100);
    }

    function setCurrentTagValue(e,  dataItem) {
        console.log('handleChange DataItem----------------', dataItem);
        console.log('currentTag------------------------', currentTag)
        //set a timeout 
        setTimeout(function() {
            const re = new RegExp(_.escapeRegExp(dataItem.value), 'i')
            const isMatch = result => re.test(result.value)
        
            const filteredTags = tags.slice().filter(isMatch);
            console.log('filteredTag handleChange------------------', filteredTags);
            setTags(filteredTags);
            setCurrentTag(dataItem ? dataItem.value : "");

        }, 100);

    }


    function removeTag(e, tagIndex) {
        e.stopPropagation();
        const form = utils.deepCopy(newPostForm);

        var tagToReAdd = utils.deepCopy(tags[tagIndex]);

        form.tags.splice(tagIndex, 1);
        
        form.tags.push(tagToReAdd);

        setNewPostForm(form);
    }

    function handleChange(e, type) {
        e.stopPropagation();
        const form = utils.deepCopy(newPostForm);
        form[type] = e.target.value;
        setNewPostForm(form);
    }


    //Dropzone Props---------------------------------
    function getFirestoreParams() {
        return {};
    }

    function handleImageUpload({meta}, status) {
        console.log('status---------------', status);
        console.log('meta----------------', meta);
    }

    function submitUpload(files, allFiles) {
        console.log('files------------------', files);
        console.log("allFiles---------------", allFiles);
    }
    //-----------------------------------------------
    async function createPost(e, currentClient) {
        e.stopPropagation();
        try {
            newPostForm.userId = state.currentUser.id;
            newPostForm.dateCreated = dateFns.format(new Date(), 'MM/DD/YYYY hh:mm aa');
            newPostForm.tags = newPostForm.tags.filter(tag => tag !== undefined || tag !== null).map(tag => tag.text);
            alert(JSON.stringify(newPostForm))
            await new postApi(currentClient).createNewPost(state.currentUser.id, newPostForm);
            toast.success('Post Created Successfully!', { position: toast.POSITION.TOP_RIGHT });
            history.push('/dashboard');
            
        } catch(err) {
            console.log('error-------------', err);
            if(typeof err != 'object')
                toast.error(err, { position: toast.POSITION.TOP_RIGHT });
            else 
                toast.error(JSON.stringify(err), { position: toast.POSITION.TOP_RIGHT });
        }
    }
    
    return (
        <React.Fragment>
            
            <Segment>
                <Header as="h2">Create New Post</Header>
            </Segment>

            <Segment>
                <Form>
                    <FormField>
                        Title
                       <Input value={setNewPostForm.title} onChange={e => handleChange(e, 'title')} placeholder="New Post Title..." />
                    </FormField> 
                    <Image src={setNewPostForm.image || postPlaceholder}  />
                    <FormField>
                        Post Image
                        <Dropzone handleChange={handleImageUpload} handleSubmit={submitUpload} getUploadParams={getFirestoreParams} />
                    </FormField>
                    <FormField inline>
                        <Dropdown selection={true} clearable={true} lazyLoad={true} options={tags.length ? tags : data.tags} onChange={setCurrentTagValue} />
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
                                    <TagItem key={i} {...tag} onClick={e => removeTag(e, i)} />
                                ))
                                : null
                        }
                    </Segment.Group>
                    <Button onClick={e => createPost(e, client)} primary>
                        Create Post
                    </Button>
                </Form>
            </Segment>
        </React.Fragment>
    );
};

export default withRouter(NewPostPage);