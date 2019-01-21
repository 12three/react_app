import React from 'react';

const userOutput = function (props) {
    const style = {
        cursor: 'pointer',
        color: props.isChosen ? 'red' : 'green',
    }

    return (
        <div>
            <p
                style={style}
                onClick={props.click}>
                <b>{props.name}</b>
            </p>
            <p>Dolorum ut quibusdam aut optio exercitationem voluptate iste animi reiciendis.
                Et perferendis ut rem quos.
                Eveniet ex odit ut.
            </p>
        </div>
    )
}

export default userOutput;