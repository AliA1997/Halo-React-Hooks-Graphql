import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as utils from '../utils';

const SearchBar = ({client, searchFunc}) => {
    const [ searchValue, setSearchValue ] = useState("");


    function handleChange(val) {
        setSearchValue(val);
    }

    return (
        <div className="white-subcontainer">
            <input value={searchValue} onChange={e => handleChange(e.target.value)}/>
            <button className="btn" onClick={e => searchFunc(e, searchValue, client)}>
                {utils.Icon('search')}
                {
                    searchValue.length ? 
                        "Reset"
                        : "Search"
                }
            </button>
            <div>
                <label>My Posts</label>
                <input id="my-posts-checkbox" type="checkbox" onChange={(e) => handleChange(e.target.value)} value="My Posts"/>
            </div>
        </div>
    );
};

SearchBar.propTypes = {
    searchFunc: PropTypes.func.isRequired,
    client: PropTypes.object
}

export default SearchBar;