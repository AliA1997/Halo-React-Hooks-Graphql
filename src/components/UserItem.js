import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';


const UserItem = ({history, id, username, avatar, dateRegistered}) => {
    return (
        <Card onClick={() => history.push(`/users/${id}`)}>
            <Image src={avatar} size="large" />
            <Card.Header>{username}</Card.Header>
            <Card.Content>Date Registered: {dateRegistered}</Card.Content>
        </Card>
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