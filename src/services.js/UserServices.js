import axios from "./customize-axios";


const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`, {
        headers: {
            'x-api-key': 'reqres-free-v1',
            'Content-Type': 'application/json'
        }
    })
}
const postCreateUser = (name, job) => {
    return axios.post("/api/users", { name: name, job: job }, {
        headers: {
            'x-api-key': 'reqres-free-v1',
            'Content-Type': 'application/json'
        }
    });
}
const putUpdateUser = (name, job) => {
    return axios.put("/api/users/2", { name: name, job: job }, {
        headers: {
            'x-api-key': 'reqres-free-v1',
            'Content-Type': 'application/json'
        }
    });
}
const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`, {
        headers: {
            'x-api-key': 'reqres-free-v1',
            'Content-Type': 'application/json'
        }
    });
}
export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser };