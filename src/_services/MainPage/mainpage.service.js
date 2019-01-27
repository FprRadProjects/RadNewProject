import axios from 'axios'

export const mainpageService = {
    login
};

function login(username, password) {
    let data = new FormData();
    data.append("username", username);
    data.append("password", password);
    return axios.post("http://localhost:2535/Login", data)
        .then(user => {
            localStorage.setItem("user", JSON.stringify(user.data.data));
            return Promise.resolve(user.data)
        })
        .catch((error) => {
            return Promise.reject(error.message)
        })

}
