import React from 'react';
import Button from '../UI/Button/Button';

export default function OrderSummary(props) {
    const ingredientSummary = Object.keys(props.ingredients).map((key, i) => {
        return <li key={key + i}>
                <span
                    style={{ textTransform: 'capitalize' }}>
                    {key}
                </span>: {props.ingredients[key].amount}
            </li>;
    });

    return <>
            <h3>Your order:</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>{ingredientSummary}</ul>
            <p><b>Total Price: {props.price}</b></p>
            <p>Continue to Checkout?</p>
            <Button
                btnType="Danger"
                clicked={props.purchaseClosed}>
                CANCEL
            </Button>
            <Button
                btnType="Success"
                clicked={props.purchaseContinue}>
                CONTINUE
            </Button>
        </>;
}
