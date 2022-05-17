import { UserActionTypes } from "../constant/UserActionTypes";

const initialState = {
  isAuthUser: !!localStorage.getItem("user"),
  user: JSON.parse(localStorage.getItem("user")) || {},
  isLoading: false,
  error: null,
};

export const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UserActionTypes.API_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload.user));
      return { ...state, isAuthUser: true, user: payload.user  };
    case UserActionTypes.API_ERROR:
        return { ...state,  ...payload};
    case UserActionTypes.LOGOUT:
        localStorage.removeItem("user");
        return { ...state, isAuthUser: false, user: {}};    
    default:
      return state;
  }
};
