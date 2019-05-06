import React, { useReducer, useContext, useState, useRef, useEffect } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
//import your context and reducer for that context.
import { UserContext, UserReducer } from '../contexts/user/userReducer';
import userInitState from '../contexts/user/userInitialState';
import * as UserActionTypes from '../contexts/user/userActionTypes';
import * as utils from '../utils';
import UserApi from '../api/users/userApi';
import LoadingScreen from '../components/LoadingScreen';
import haloLogo from '../halo-logo.svg';
import dateFns from 'date-fns';

const Register = (props) => {
    //Define useRef for unmounting the component.
    const ref = useRef();

    //Use your context via use Context, and use the context reducer, also use useMemo to prevent unnecessary dom updates
    const [userState, dispatch] = useReducer(UserReducer, userInitState);
    const userValues = useContext(UserContext);

    const [registerForm, setRegisterForm] = useState({
                                                username: '',
                                                avatar: '',
                                                password: '',
                                                age: ''
                                            });
                                        
    function handleChange(e, type) {

        e.stopPropagation();
        
        const form = utils.deepCopy(registerForm);
        
        form[type] = e.target.value;
        
        setRegisterForm(form);
    }

    async function register(e, client) {
        e.stopPropagation();
                
        registerForm.dateRegistered = dateFns.format(new Date(), 'MM/DD/YYYY hh:mm aa');
        
        registerForm.age = parseInt(registerForm.age);
        
        const result = await new UserApi(client).register(registerForm);
        
        dispatch({type: UserActionTypes.LOGIN, loggedInUser: result.data.register});
        
        setRegisterForm({username: '', avatar: '', password: '', age: ''});

        toast.success('Successfully registered!', {position: toast.POSITION.TOP_RIGHT});
        
        props.history.push('/dashboard');
    }

    useEffect(() => {
        if(ref) 
            cancelAnimationFrame(ref.current);
    })

    return (
        <ApolloConsumer>
            {client => {
                if(client) {
                    return (
                        <div id="login-container">
                            <img src={haloLogo} className="register-container-image" />
                            <h1 className="register-header"> Register</h1>
                            <label className="register-form-label">Username</label>
                            <input value={registerForm.username} onChange={(e) => handleChange(e, 'username')} placeholder="Username...."/>
                            <label className="register-form-label">Password</label>
                            <input value={registerForm.password} onChange={(e) => handleChange(e, 'password')} placeholder="Password...."/>
                            <label className="register-form-label">Avatar</label>
                            <input value={registerForm.avatar} onChange={(e) => handleChange(e, 'avatar')} placeholder="Avatar...."/>
                            <label className="register-form-label">Age</label>
                            <input value={registerForm.age} onChange={(e) => handleChange(e, 'age')} placeholder="Age...."/>

                            <div className="button-group">
                                <button className="btn" onClick={(e) => register(e, client)}>Register</button>
                            </div>
                        </div>
                    );
                }
                return <LoadingScreen />
            }}
        </ApolloConsumer>
    )
};

export default withRouter(Register);