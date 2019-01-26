import axios from 'axios'

export const Service_Dashboard = {
    FetchData
};

function FetchData(params) {

    let apiToken = localStorage.getItem("user");
    if (apiToken != null) {
        const newuser = JSON.parse(apiToken);

        var headers = {
            "token": newuser.Token
        }

        return axios.post('http://localhost:2535/WorkDashboard', params, {headers: headers})


            .then(response => {
                //console.log(response.data.data)
                return Promise.resolve(response.data)
            })
            .catch(error => {
                return Promise.reject(error.message)
            })
    }
}

