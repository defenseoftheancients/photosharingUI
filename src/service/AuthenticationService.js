import axios from "axios";

const API_URL = "http://localhost:8081/photosharing/api/auth/";

class AuthenticationService {
 
  async login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          return response.data;
        }
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, fullname, password, email) {
    return axios.post(API_URL + "signup", {
      username,
      fullname,
      password,
      email
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthenticationService();
