import React from 'react';
import { Card, Image, Header, Label, CardContent } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const PostItem = ({history, id, title, image, dateCreated}) => {
    console.log('title-----------', title);
    return (
        <Card onClick={() => history.push(`/posts/${id}`)}>
            
            <Image src={image} size="large"/>

            <Card.Header>
                
                <Header>{title}</Header>
         
            </Card.Header>
                
            <Card.Content>

                <Label>
                    {dateCreated ? `Date Created: ${dateCreated}` : ''}
                </Label>
                
            </Card.Content>   
        
        </Card>
    );
};

PostItem.propTypes = {
    history: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    dateCreated: PropTypes.string
}

export default PostItem;