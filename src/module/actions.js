import axios from "axios";

export default {
    getStudent: () => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + localStorage.getItem("user_access_token");
            axios.get("/api/student/index").then(
                response => {
                    console.log(response)
                    resolve(response)
                },
                error => {
                    reject(error)
                });
        });
    },
    register(_, payload) {

        return new Promise((resolve, reject) => {
            axios.post('http://127.0.0.1:8000/api/register', { name: payload.name, email: payload.email, password: payload.password }).then(
                response => {
                    resolve(response)
                },
                error => {
                    console.log('error', error)
                    reject(error)
                })
        })
    },
    login({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('http://127.0.0.1:8000/api/login', { email: payload.email, password: payload.password }).then(
                response => {

                    if (response.data.status) {

                        const access_token = response.data.data.token;
                        localStorage.setItem('access_token', access_token)
                        commit('mainStore/setAccessToken', access_token, { root: true })
                        commit('mainStore/setLoggedIn', true, { root: true })
                        resolve(response)
                    } else {
                        reject(response)
                    }

                },
                error => {
                    reject(error)
                }

            )

        })
    }
};