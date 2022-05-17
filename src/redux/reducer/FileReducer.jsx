import { FileActionTypes } from "../constant/FileActionTypes";

const initialState = {
  files: [],
};

export const FileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FileActionTypes.SET_FILE: {
      let files = [...state.files];
      files.push({src: payload.src, tags: payload.tags});
     
      return { ...state, files: files };
    }
     
    case FileActionTypes.REMOVE_SELECTED_FILE: {
      let files = [...state.files];
      files.splice(payload.index, 1);
    
      return { ...state, files: files};
    }
    case FileActionTypes.REMOVE_ALL_FILES: {
      let files = [...state.files];
      for(let i = 0;i < files.length;i++) 
        URL.revokeObjectURL(files[i].src);
      return { ...state, files: []};
    }
    default:
      return state;
  }
};
