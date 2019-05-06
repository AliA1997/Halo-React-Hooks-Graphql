import React from 'react';
import PropTypes from 'prop-types';


const UserItem = ({history, id, username, avatar, dateRegistered}) => {
    return (
        <div onClick={() => history.push(`/users/${id}`)}>
            <h1>{username}</h1>
            <image src={avatar} className="user-avatar" />
            <p>Date Registered: {dateRegistered}</p>
        </div>
    );
};

UserItem.propTypes = {
    history: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    dateRegistered: PropTypes.string
}

export default UserItem;