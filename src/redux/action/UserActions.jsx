import { UserActionTypes } from "../constant/UserActionTypes"

export const setUserSuccess = (user) => ({
    type: UserActionTypes.API_SUCCESS,
    payload: {
        user
    }
})
export const setUserError = (error) => ({
    type: UserActionTypes.API_ERROR,
    payload: {
        error
    }
})
export const userLogout = () => ({
    type: UserActionTypes.LOGOUT,
    payload: {   
    }
})