import React from 'react';

import classes from './BurgerControls.css';
import BurgerControl from './BurgerControl/BurgerControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

function BurgerControls(props) {
    return <div className={classes.BurgerControls}>
        <p>Current Price: <b>{props.price.toFixed(2)}</b></p>
        {  controls.map((item) => {
            return <BurgerControl
                label={item.label}
                key={item.type}
                isDisabled={props.disabledInfo[item.type]}
                added={() => props.ingredientAdded(item.type)}
                removed={() => props.ingredientRemoved(item.type)}/>;
        }) }
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>
            { props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER' }
        </button>
    </div>;
}

export default BurgerControls;
