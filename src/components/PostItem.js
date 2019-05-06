import React from 'react';
import PropTypes from 'prop-types';

const PostItem = ({history, id, title, image, dateCreated}) => {
    return (
        <div>

        </div>
    );
};

PostItem.propTypes = {
    history: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired
}

export default PostItem;