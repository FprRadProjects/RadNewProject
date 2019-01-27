import axios from 'axios'

export const WorkDetailsAction = {
    RebuildWork
};

let apiToken = localStorage.getItem("user");
if (apiToken != null) {
    const newuser = JSON.parse(apiToken);
    var headers = {"Token": newuser.Token};
}

function RebuildWork(peygir_id) {
    return axios.post("http://localhost:2535/RebuildWork", peygir_id, {headers: headers})
        .then(data => {
            console.log(data.data)
            //return Promise.resolve(data.data)
        })
        .catch((error) => {
            return Promise.reject(error.message)
        })
}

