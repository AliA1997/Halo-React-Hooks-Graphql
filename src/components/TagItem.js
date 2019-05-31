import React from 'react';
import { Comment, Button, Icon } from 'semantic-ui-react';

const TagItem = ({value, text, onClick}) => {
    return (
        <Comment onClick={e => onClick(e, value)}>
            <Comment.Content>
                {text}
                <Icon name="close" color="red" />
            </Comment.Content>
        </Comment>
    );
};

export default TagItem;