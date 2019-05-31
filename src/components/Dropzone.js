import React, { useState } from 'react';
import Uploader from 'react-dropzone-uploader';


const Dropzone = ({handleChange, handleSubmit, getUploadParams}) => {


    return (
        <Uploader 
            getUploadParams={getUploadParams}
            onChangeStatus={handleChange}
            onSubmit={handleSubmit}
        />
    )
}

export default Dropzone;