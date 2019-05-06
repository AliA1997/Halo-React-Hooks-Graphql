import React, { useReducer, useContext, useState, useEffect, useRef } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { toast } from 'react-toastify';
//import your context and reducer for that context.
import { UserContext} from '../contexts/user/userReducer';
import * as ActionTypes from '../contexts/user/userActionTypes';
import * as utils from '../utils';
import LoadingScreen from '../components/LoadingScreen';
import UserApi from '../api/users/userApi';
import { withRouter } from 'react-router-dom';
import haloLogo from '../halo-logo.svg';
import 'react-toastify/dist/ReactToastify.css';


const LoginPage = (props) => {

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
            const loggedInUser = await new UserApi(client).login(authForm);
        
            dispatch({type: ActionTypes.LOGIN, loggedInUser});

            setAuthForm({username: '', password: ''});

            toast.success('Login Succesful!', { position: toast.POSITION.TOP_RIGHT });
            
            props.history.push('/dashboard');
                
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
        <ApolloConsumer>
            {client => {
                if(client) {
                    return (
                        <div id="login-container">
                            <img src={haloLogo} className='login-container-image'/>
                            <h1 className="login-header">Helo</h1>
                            <input value={authForm.username} onChange={(e) => handleChange(e, 'username')} placeholder="Username...."/>
                            <input value={authForm.password} onChange={(e) => handleChange(e, 'password')} placeholder="Password...."/>
                            <div className="button-group">
                                <button className="btn" onClick={(async e => await login(e, client))}>Login</button>
                                <button className="btn" onClick={(e) => props.history.push('/register')}>Register</button>
                            </div>
                        </div>
                    );
                }
                return <LoadingScreen />
            }}
        </ApolloConsumer>
    );
};

export default withRouter(LoginPage);