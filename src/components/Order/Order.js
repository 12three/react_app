import React from 'react';

import classes from './Order.css';

const Order = (props) => {
    const price = Number.parseFloat(props.price).toFixed(2);
    const ingredients = Object.keys(props.ingredients).map(ingName => {
        const amount = props.ingredients[ingName];

        if (amount <= 0) {
            return null
        }

        return <span
            style={{
                display: 'inline-block',
                textTransform: 'capitalize',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px',
            }}>
            {`${ingName} (${(amount)})`}
        </span>
    })

    return <div className={classes.Order}>
        <p>Ingredients: {ingredients}</p>
        <p>Price: <b>USD { price }</b></p>
    </div>
}

export default Order;