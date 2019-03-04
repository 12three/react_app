import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};

const reducer = (state = initialState, action) => {
    const updateStore = updateState(state);

    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateStore({
                purchased: false,
            })
        case actionTypes.PURCHASE_BURGER_START:
            return updateStore({
                loading: true,
            })
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }

            return updateStore({
                loading: false,
                purchased: true,
                orders: [...state.orders, newOrder],
            })
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateStore({
                loading: false,
            })
        case actionTypes.FETCH_ORDERS_START:
            return updateStore({
                loading: true,
            })
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateStore({
                loading: false,
                orders: action.orders,
            })
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateStore({
                loading: false,
            })
        default:
            return state
    }
}

export default reducer;