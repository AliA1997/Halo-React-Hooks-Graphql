import React, { useEffect, useContext, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import { UserContext } from './contexts/user/userReducer';
import * as ActionTypes from './contexts/user/userActionTypes';
const AuthenticatedWrapper = React.lazy(() => import('./AuthenticatedWrapper'));
import * as styles from './styles';
import 'react-dropzone-uploader/dist/styles.css';


const App = (props) =>{
    const ref = useRef();
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if(state && !state.currentUser) 
            dispatch({type: ActionTypes.SET_USER, user: userString})
    }, null)

    useEffect(() => {
        if(ref)
            cancelAnimationFrame(ref.current);
    }, null)

    return (
        <div style={styles.container}>
            <ToastContainer />
            <AuthenticatedWrapper />
        </div>
    );

}

export default App;