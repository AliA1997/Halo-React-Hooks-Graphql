import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as utils from '../utils';

const SearchBar = ({client, searchFunc}) => {
    const [ searchValue, setSearchValue ] = useState("");


    function handleChange(val) {
        setSearchValue(val);
    }

    return (
        <div className="white-subcontainer search-container">
            <div className="search-subcontainer">
                <input className='search-input' value={searchValue} onChange={e => handleChange(e.target.value)} placeholder="Search Value....."/>
                <button className="btn search-btn" onClick={e => searchFunc(e, searchValue, client)}>
                    {utils.Icon('search')}
                    {
                        searchValue.length ? 
                            "Reset"
                            : "Search"
                    }
                </button>
            </div>
            <div className="checkbox-div">
                <label>My Posts</label>
                <input id="my-posts-checkbox" type="checkbox" onChange={(e) => handleChange(e.target.value)} />
            </div>
        </div>
    );
};

SearchBar.propTypes = {
    searchFunc: PropTypes.func.isRequired,
    client: PropTypes.object
}

export default SearchBar;