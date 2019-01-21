import React from 'react';

const userInput = function(props) {
    const changeHandler = (e) => {
        props.change(e.target.value);
    }
    const isOpen = false;

    return (
        <input
            type="text"
            onChange={ changeHandler }
            value={ props.value }/>
    )
}

export default userInput;