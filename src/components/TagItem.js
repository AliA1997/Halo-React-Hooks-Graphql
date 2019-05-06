import React from 'react';

const TagItem = ({tag, onClick}) => {
    return (
        <div onClick={onClick} className="tag">
            <h4 className="tag-text">{tag}</h4>
        </div>
    );
};

export default TagItem;