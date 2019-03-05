import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = ({ idToken, userId }) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId,
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkOutTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error,
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true,
        };

        dispatch(authStart());

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDUH0dxZctDI8A1Za41ESwZSx3MLOibpl8';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDUH0dxZctDI8A1Za41ESwZSx3MLOibpl8'
        }
        axios.post(
            url,
            authData,
            )
            .then( ({data}) => {
                const expirationTime = new Date(new Date().getTime() + data.expiresIn);
                localStorage.setItem('token', data.expiresIn);
                localStorage.setItem('expirationTime', expirationTime);
                dispatch(authSuccess(data));
                dispatch(checkOutTimeout(data.expiresIn));
            })
            .catch(err => dispatch(authFail(err.response.data.error)))
    }
}

export const setAuthRedirect = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path,
    }
}