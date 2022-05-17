import { PageActionTypes } from "../constant/PageActionTypes"

const initialState = {
    page: 1
}

export const PageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PageActionTypes.SET_PAGE:
        return { ...state, ...payload }
    case PageActionTypes.ADVANCE_PAGE:
        return { ...state, page: state.page + 1 }
    default:
        return state
    }
}
