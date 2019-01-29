import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

function Burger(props) {
    let transformedIngredients = Object.keys(props.ingredients)
        .map( ingId => {
            return [...Array(props.ingredients[ingId].amount)].map((_, i) => {
                return <BurgerIngredient type={ingId} key={ingId + i} />;
            });
        })
        .reduce((acc, item) => { return acc.concat(item) }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;
