import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import uuid from 'uuid';
import 'react-toastify/dist/ReactToastify.css';


const Toast = React.forwardRef((props, ref) => {
    
    const {type, message, delay, position} = props;

    let toastPosition,
        toastType;
    if(position === 'top') 
        toastPosition = toast.POSITION.TOP_RIGHT;
    else if(position === 'bottom')
        toastPosition = toast.POSITION.BOTTOM_LEFT;
    else if(position === 'left')
        toastPosition = toast.POSITION.TOP_LEFT;
    else if(position === 'right')
        toastPosition = toast.POSITION.BOTTOM_RIGHT;

    if(type === 'sucess')
        toastType = toast.TYPE.SUCCESS;
    else if(type === 'warning')
        toastType = toast.TYPE.WARNING;
    else if(type === 'info')
        toastType = toast.TYPE.INFO;
    else if(type === 'error')
        toastType = toast.TYPE.ERROR;
    else 
        toastType = toast.TYPE.DEFAULT;

    function notify() { return toast(message, { autoClose: delay || 10000, type: toastType}) };
    
    return (
        <ToastContainer enableMultiContainer containerId={uuid.v4()} position={toastPosition}/>
    );
});



export default Toast;