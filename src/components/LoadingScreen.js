import React from 'react';
import Loader from 'react-loader';

const LoadingScreen = (props) => {
    if(props.isLoaded) {
        return (
            <Loader loaded={props.isLoaded} />
        );
    }
    return <Loader loaded={true} />
};

export default LoadingScreen;