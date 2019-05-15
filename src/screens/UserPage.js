import React, { useState, useEffect, useRef } from 'react';
import { Container, Segment, Image, Icon, Header, Card } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import _  from 'lodash';
import userApi from '../api/users/userApi';
import { UserContext } from '../contexts/user/userReducer';



const UserPage = ({match, client}) => {

    const ref = useRef();

    const id = match.params.userId;

    const [user, setUser] = useState({});

    const { state } = useContext(UserContext);

    async function getUser(client) {
        let userData,
            subscriber;

        if(navigator.onLine) {
            //Will use subscription in order to retrieve real time data over the server using graphql
            //I
            subscriber = await new userApi(client).getSingleUser(id);
            subscriber.subscribe(({data}) => {
                setUser(data.user);
            });
        } else {
            userData = await new userApi(client).getSingleUserOffline(id);
            setUser(userData.data.user);
        }

    }

    useEffect(() => {
    
        getUser(client);
    
    }, null);

    useEffect(() => {
        cancelAnimationFrame(ref.current);
    }, null);   

    return (
        <Container>
            <Segment>
                <Header as="h2">
                    {user.username}
                </Header>
            </Segment>
            <Segment>
                <Image src={user.avatar} size="large" />
                <Card>
                    {
                        state.currentUser && state.currentUser.friends.includes(id) 
                        ? <Icon name="remove user" />
                        : <Icon name="user plus" />
                    }
                </Card>
            </Segment>
            {JSON.stringify(user)}
        </Container>
    );
};

export default withRouter(UserPage);