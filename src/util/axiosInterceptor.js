import axios from "axios";

const axiosInterceptor = axios.interceptors.response.use(
    (response) => {
        if (response.status === 401) {
            console.log("You are not authorized");
            window.location.href = "http://localhost:3000/login";
        }
        if (response.status === 404) {
            console.log("You are not authorized");
            window.location.href = "http://localhost:3000/";
        }
        return response;
    },
    (error) => {
        if (error.response && error.response.data) {
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export default axiosInterceptor;
