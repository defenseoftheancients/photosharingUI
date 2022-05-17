import { FileActionTypes } from "../constant/FileActionTypes";

export const setFile = (src, tags) => ({
    type: FileActionTypes.SET_FILE,
    payload: {
        src,
        tags
    }
})

export const removeAllFiles = () => ({
    type: FileActionTypes.REMOVE_ALL_FILES,
    payload: {
        
    }
})

export const removeSelectedFile = (index) => ({
    type: FileActionTypes.REMOVE_SELECTED_FILE,
    payload: {
        index
    }
})
