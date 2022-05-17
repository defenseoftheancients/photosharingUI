import axios from "axios";

class UserService {
    async getUser(currentUser, url) {
        const response = await axios.get(url, {
            params: {
                username: "userDTO" in currentUser ? currentUser.userDTO.username : null,
            }
        },)
        .then(response=>response)
        .catch((e)=>{return e.response})
        return response;
    }

    async changeAvtar(currentUser, url, file) {
        const formData = new FormData();
        formData.append("avatar", file);
        const response = await axios
            .post(url, formData, {
                headers: {
                    Authorization: "Bearer " + currentUser.accessToken,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => response)
            .catch((e) => {
                console.log("Error", e);
            });
        return response;
    }
}

export default new UserService();
