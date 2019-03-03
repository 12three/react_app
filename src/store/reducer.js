import * as actionTypes from './actions';

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
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: {
                        ...state.ingredients[action.ingredientName],
                        amount: state.ingredients[action.ingredientName].amount + 1,
                    }
                },
                totalPrice: state.totalPrice + state.ingredients[action.ingredientName].price,
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: {
                        ...state.ingredients[action.ingredientName],
                        amount: state.ingredients[action.ingredientName].amount - 1,
                    }
                },
                totalPrice: state.totalPrice - state.ingredients[action.ingredientName].price,
            }
        default:
            return state;
    }

    return state;
}

export default reducer;