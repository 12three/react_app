import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: null,
    redirectPath: '/',
};

const reducer = (state = initialState, action) => {
    const updateStore = updateState(state);

    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateStore({
                error: null,
                loading: true,
            });
        case actionTypes.AUTH_SUCCESS:
            return updateStore({
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false,
            });
        case actionTypes.AUTH_FAIL:
            return updateStore({
                error: action.error,
                loading: false,
            });
        case actionTypes.AUTH_LOGOUT:
            return updateStore({
                token: null,
                userId: null,
            });
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return updateStore({
                redirectPath: action.path,
            });
        default:
            return state;
    }


}

export default reducer;