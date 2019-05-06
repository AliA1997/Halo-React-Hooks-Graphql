import React, { useState, useEffect } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import _  from 'lodash';
import * as utils from '../utils';
import userApi from '../api/users/userApi';
import LoadingScreen from '../components/LoadingScreen';

const UserPage = (props) => {

    const [user, setUser] = useState(null);

    async function getUser(client) {
        let userData;
        if(navigator.onLine) 
            userData = await new userApi(client).getSingleUser(id).data.getUser;
        else 
            userData = await new userApi(client).getSingleUserOffline(id).data.getUser;
    
        setUser(userData);
    }

    return (
      <ApolloConsumer>
          {client => {
              if(client) {
                  getUser(client);
                  <div>
                      {JSON.stringify(user)}
                  </div>
              }
              return <LoadingScreen />
          }}
      </ApolloConsumer>  
    );
};

export default withRouter(UserPage);