import { PhotoActionTypes } from "../constant/PhotoActionTypes";
export const setPhotos = (photos) => ({
    type: PhotoActionTypes.STACK_PHOTOS,
    payload: {
        photos,
    },
});
export const advancePage = (page) => ({
    type: PhotoActionTypes.ADVANCE_PAGE,
    payload: {
        page,
    },
});
export const removePhotos = () => ({
    type: PhotoActionTypes.REMOVE_PHOTOS,
    payload: {},
});

export const selectedPhoto = (photo, owner) => ({
    type: PhotoActionTypes.SELECTED_PHOTO,
    payload: {
        photo,
        owner,
    },
});
export const SwitchReactionSelectedPhoto = (photo, owner, isSender) => ({
    type: PhotoActionTypes.SWITCH_REACTION,
    payload: {
        photo,
        owner,
        isSender,
    },
});

export const pushComment = (comment) => ({
    type: PhotoActionTypes.PUSH_COMMENT,
    payload: {
        comment,
    },
});

export const stackComments = (comments) => ({
    type: PhotoActionTypes.STACK_COMMENTS,
    payload: {
        comments,
    },
});

export const removeSelectedPhoto = () => ({
    type: PhotoActionTypes.REMOVE_SELECTED_PHOTO,
    payload: null,
});
