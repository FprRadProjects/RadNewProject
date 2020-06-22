import axios from 'axios';

axios.interceptors.request.use(
    config => {
        let apiToken = localStorage.getItem("user");
        let Lang = localStorage.getItem("lang");
        const newuser = JSON.parse(apiToken);


        if (apiToken != undefined) {
            if (apiToken !== null) {
                config.headers.common['Authorization'] = `${newuser.Authorization}`
            }
            if (Lang !== null) {
                config.headers.common['lang'] = Lang
            }
            config.headers.common['Content-Type'] = `application/json`;
            config.headers.common['Accept'] = `application/json`;

        }
        return config
    },
    error => Promise.reject(error)
);


