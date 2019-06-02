import React, { useReducer, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { Button, Container, Form, Segment, Image, Header, Input, Loader } from 'semantic-ui-react';
import { ApolloConsumer } from 'react-apollo';
import { toast } from 'react-toastify';
//import your context and reducer for that context.
import { UserContext} from '../contexts/user/userReducer';
import * as ActionTypes from '../contexts/user/userActionTypes';
import * as utils from '../utils';
import * as styles from '../styles';
import UserApi from '../api/users/userApi';
import { withRouter } from 'react-router-dom';
import haloLogo from '../halo-logo.svg';
import 'react-toastify/dist/ReactToastify.css';


const LoginPage = ({history, client}) => {

    var ref = useRef();

    const { state, dispatch } = useContext(UserContext);

    const [authForm, setAuthForm] = useState({
                                                username: '',
                                                password: ''
                                            });
             

    function handleChange(e, type) {
        e.stopPropagation();
        const form = utils.deepCopy(authForm);
        form[type] = e.target.value;
        setAuthForm(form);
    }

    async function login(e, client) {
        e.stopPropagation();
        //Define a value that will be used for the life of the component
        try {
            const { data } = await new UserApi(client).login(authForm);
        
            dispatch({type: ActionTypes.LOGIN, loggedInUser: data.login, loggedInUserString: JSON.stringify(data.login)});

            setAuthForm({username: '', password: ''});

            toast.success('Login Succesful!', { position: toast.POSITION.TOP_RIGHT });
            
            history.push('/dashboard');
                
        }
        catch(error) {
            toast.error(`${error}`, { position: toast.POSITION.TOP_RIGHT });
        }
    }

    useEffect(() => {
        if(ref)
            cancelAnimationFrame(ref.current);
    }, null)


    return (
        <Segment size="massive" style={styles.loginPageContainer()} vertical={true} textAlign='center'>
            <Segment.Group size="massive" style={styles.loginPageSubContainer}>
                <Image src={haloLogo} size="small" style={styles.image}/>
                <Header.Content as="h1">Helo</Header.Content>
                <Form style={styles.fullWidth}>
                    <Form.Field>
                        <Input value={authForm.username} onChange={(e) => handleChange(e, 'username')} placeholder="Username...." size="large"/>
                    </Form.Field>
                    <Form.Field>
                        <Input value={authForm.password} onChange={(e) => handleChange(e, 'password')} placeholder="Password...." size="large" />
                    </Form.Field>
                    <Segment.Inline>
                        <Button onClick={(async e => await login(e, client))}>Login</Button>
                        <Button onClick={(e) => history.push('/register')}>Register</Button>
                    </Segment.Inline>
                </Form>
                
            </Segment.Group>
        </Segment>
    );
};

export default withRouter(LoginPage);