import axios from "axios";
import SYSTEM_URL from "../util/urls";

class PhotoService {
    async getPhoto(currentUser, photoid) {
        const response = await axios
            .get(SYSTEM_URL.PHOTO_API_URL() + `/${photoid}`, {
                params: {
                    username: "userDTO" in currentUser ? currentUser.userDTO.username : null,
                },
            })
            .then((response) => response)
            .catch((e) => {
                console.log("Error", e);
                return e.response;
            });
        return response;
    }

    async getComment(photoid) {
        const response = await axios
            .get(SYSTEM_URL.COMMENT_API_URL(photoid))
            .then((response) => response)
            .catch((e) => {
                console.error("Error", e);
                return e.response;
            });
        return response;
    }
    async getPhotosOfFollowedUser(url, currentUser, page) {
        const response = await axios
            .get(url, {
                params: {
                    userid: currentUser.userDTO.id,
                    page: page,
                },
                headers: {
                    Authorization: "Bearer " + currentUser.accessToken,
                },
            })
            .then((response) => response)
            .then((response) => response.data)
            .catch((e) => {
                console.log("Error", e);
            });
        return response;
    }

    async getlikedPhotosOfUser(url, currentUser, page) {
        // console.log(currentUser.accessToken);
        const response = await axios
            .get(url, {
                params: { 
                    page: page,
                },
                headers: {
                    Authorization: "Bearer " + currentUser.accessToken,
                },
            })
            .then((response) => response)
            .then((response) => response.data)
            .catch((e) => {
                console.log("Error", e);
            });
        return response;
    }

    async getLikedUsesrOfPhoto(url) {
        const response = await axios
            .get(url)
            .then((response) => response)
            .then((response) => response.data)
            .catch((e) => {
                console.log("Error", e);
            });
        return response;
    }

    async getPhotos(url, currentUser, page, sortParam = null, searchParam = null) {
        const response = await axios
            .get(url, {
                params: {
                    username: "userDTO" in currentUser ? currentUser.userDTO.username : null,
                    page: page,
                    sortParam: sortParam,
                    searchParam: searchParam,
                },
            })
            .then((response) => response)
            .then((response) => response.data)
            .catch((e) => {
                console.log("Error", e);
                return e.response;
            });
        return response;
    }

    async getTags(url, file) {
        const response = await axios
            .post(url, file, {
                headers: {
                    "Content-type": "image/jpeg",
                },
            })
            .then((response) => response)
            .then((response) => response.data)
            .catch((e) => {
                console.log("Error", e);
            });
        return response;
    }

    async download(url) {
        await axios
            .get(url, {
                responseType: "blob",
            })
            .then((response) => {
                const fileName = url.split(/(\\|\/)/g).pop();
                const href = URL.createObjectURL(new Blob([response.data]));
                const a = document.createElement("a");
                a.href = href;
                a.download = fileName;
                a.click();
            });
    }

    async uploadPhoto(currentUser, files) {
        var formData = new FormData();
        const data = [];
        const fileInfors = document.querySelectorAll(".file-infor");
        const fileFrame = document.querySelectorAll(".file-frame");

        fileInfors.forEach(async (fileInfor, index) => {
            const obj = {};

            const inputs = fileInfor.querySelectorAll("input:not([class*=tagin-input]");
            const textarea = fileInfor.querySelector("textarea");
            inputs.forEach((input) => {
                if (input.name === "tag") {
                    obj["tags"] = [];
                    input.value.split(" ").forEach((tag) => {
                        obj["tags"].push({
                            tagname: tag,
                        });
                    });
                } else obj[input.name] = input.value;
            });
            const img = fileFrame[index].querySelector("img");
            obj["resolution"] = img.naturalWidth + "x" + img.naturalHeight;
            obj["description"] = textarea.value;
            data.push(obj);
        });

        formData.append("user", JSON.stringify(currentUser.userDTO));
        formData.append("fileInfors", JSON.stringify(data));

        files.forEach((file) => {
            formData.append("fileContents", file.src);
        });

        return await axios
            .post(SYSTEM_URL.PHOTO_API_URL(currentUser.userDTO.id), formData, {
                headers: {
                    Authorization: "Bearer " + currentUser.accessToken,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response);
            })
            .catch((e) => {
                console.log("Error", e);
            });
    }
}

export default new PhotoService();
