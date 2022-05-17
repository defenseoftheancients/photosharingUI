import { PageActionTypes } from "../constant/PageActionTypes";

export const setPage = (page) => ({
    type: PageActionTypes.SET_PAGE,
    payload: {
        page
    }
})
export const advancePage = () => ({
    type: PageActionTypes.ADVANCE_PAGE,
    payload: {
    
    }
})