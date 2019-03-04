import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../utility';

const initialState = {
    ingredients: {
        salad: {
            amount: 0,
            price: 0.5,
        },
        bacon: {
            amount: 0,
            price: 0.7,
        },
        cheese: {
            amount: 0,
            price: 0.4,
        },
        meat: {
            amount: 0,
            price: 1.3,
        },
    },
    totalPrice: 0,
}

const reducer = (state = initialState, action) => {
    const updateStore = updateState(state);

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return updateStore({
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: {
                        ...state.ingredients[action.ingredientName],
                        amount: state.ingredients[action.ingredientName].amount + 1,
                    }
                },
                totalPrice: state.totalPrice + state.ingredients[action.ingredientName].price,
            })
        case actionTypes.REMOVE_INGREDIENT:
            return updateStore({
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: {
                        ...state.ingredients[action.ingredientName],
                        amount: state.ingredients[action.ingredientName].amount - 1,
                    }
                },
                totalPrice: state.totalPrice - state.ingredients[action.ingredientName].price,
            })
        case actionTypes.RESET_INGREDIENT:
            const emptyIngredients = { ...state.ingredients };
            for (const key in emptyIngredients) {
                if (emptyIngredients.hasOwnProperty(key)) {
                    emptyIngredients[key].amount = 0;
                }
            }

            return updateStore({
                ingredients: emptyIngredients,
                totalPrice: 0,
            })
        default:
            return state;
    }
}

export default reducer;