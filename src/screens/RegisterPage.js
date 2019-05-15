import React, { useReducer, useContext, useState, useRef, useEffect } from 'react';
import { Segment, Form, FormField, Input, Header, Button, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
//import your context and reducer for that context.
import { UserContext } from '../contexts/user/userReducer';
import * as UserActionTypes from '../contexts/user/userActionTypes';
import * as utils from '../utils';
import UserApi from '../api/users/userApi';
import dateFns from 'date-fns';

const Register = ({history, client}) => {
    //Define useRef for unmounting the component.
    const ref = useRef();

    //Use your context via use Context, and use the context reducer, also use useMemo to prevent unnecessary dom updates
    const { state, dispatch } = useContext(UserContext);

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
        
        history.push('/dashboard');
    }

    useEffect(() => {
        if(ref) 
            cancelAnimationFrame(ref.current);
    }, null)



    return (
        <React.Fragment>

            <Segment>
                <Header as="h2"> Register</Header>
            </Segment>

            <Segment>
                <Image src={registerForm.avatar || "https://liveoakinternational.com/wp-content/uploads/2015/12/placeholder-large.jpg"} circular={true} size="large"/> 
                <Form onSubmit={async (e) => await register(e, client)}>
                    <FormField>
                        Avatar
                        <Input value={registerForm.avatar} onChange={(e) => handleChange(e, 'avatar')} placeholder="Avatar...."/>
                    </FormField>
                    <FormField>
                        Username
                        <Input value={registerForm.username} onChange={(e) => handleChange(e, 'username')} placeholder="Username...."/>
                    </FormField>
                    <FormField>
                        Password
                        <Input value={registerForm.password} onChange={(e) => handleChange(e, 'password')} placeholder="Password...."/>
                    </FormField>
                    <FormField>
                        Age
                       <Input type="number" value={registerForm.age} onChange={(e) => handleChange(e, 'age')} placeholder="Age...."/>
                    </FormField>
                    <Button type="submit" primary>
                        Register
                    </Button>
                </Form>
            </Segment>

        </React.Fragment>
    );
};

export default withRouter(Register);