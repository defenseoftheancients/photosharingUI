import { PhotoActionTypes } from "../constant/PhotoActionTypes";

const initialState = {
    photos: [],
    page: 1,
};

export const PhotoReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case PhotoActionTypes.STACK_PHOTOS:
            const photos = [...state.photos];
            payload.photos.forEach((photo) => {
                photos.push(photo);
            });
            return {
                ...state,
                photos: photos,
            };
        case PhotoActionTypes.ADVANCE_PAGE:
            return {
                ...state,
                page: payload.page,
            };
        case PhotoActionTypes.REMOVE_PHOTOS:
            return {
                photos: [],
                page: 1,
            };
        default:
            return state;
    }
};

export const selectedProductReducer = (state = { photo: null, owner: null, comments: [] }, { type, payload }) => {
    switch (type) {
        case PhotoActionTypes.SELECTED_PHOTO:
            return { ...state, photo: payload.photo, owner: payload.owner };
        case PhotoActionTypes.SWITCH_REACTION: {
            if (payload.isSender) return { ...state, photo: payload.photo, owner: payload.owner };
            else {
                const likedByUser = state.photo.likedByUser;
                const photo = { ...payload.photo };
                photo.likedByUser = likedByUser;
                return { ...state, photo: photo, owner: payload.owner };
            }
        }
        case PhotoActionTypes.PUSH_COMMENT: {
            const comments = [...state.comments];
            comments.unshift(payload.comment);
            return { ...state, comments: comments };
        }
        case PhotoActionTypes.STACK_COMMENTS: {
            const comments = payload.comments.concat([...state.comments]);
            return { ...state, comments: comments };
        }
        case PhotoActionTypes.REMOVE_SELECTED_PHOTO:
            return { photo: null, owner: null, comments: [] };
        default:
            return state;
    }
};
