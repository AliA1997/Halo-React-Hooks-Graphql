import React, { useState } from 'react';
import { Segment, Input, Icon, Button, Divider, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const SearchBar = ({client, searchFunc, type}) => {
    const [ searchValue, setSearchValue ] = useState("");


    function handleChange(val) {
        setSearchValue(val);
    }

    return (
        <Segment>
            
            <Segment.Inline>
                <Input value={searchValue} onChange={e => handleChange(e.target.value)} placeholder={`Search ${_.capitalize(type)}.....`} />
                
                <Button onClick={e => searchFunc(e, searchValue)}>
                    <Icon name="search" size="large" />
                </Button>
                {
                    type === 'posts' ?
                    <Checkbox label="My Posts" onChange={(e) => handleChange(e.target.value)} />
                    : null
                }
            </Segment.Inline>
  
        </Segment>
    );
};

SearchBar.propTypes = {
    searchFunc: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    client: PropTypes.object
}

export default SearchBar;