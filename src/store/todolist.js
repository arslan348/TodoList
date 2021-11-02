 import axios from "axios"

 const state = () => {}
 const getters = {}
 const mutations = {}
 const actions = {

     getuser: () => {
         return new Promise((resolve, reject) => {
             axios.defaults.headers.common["Authorization"] =
                 "Bearer " + localStorage.getItem("access_token");
             axios.get('http://127.0.0.1:8000/api/todos').then(
                 response => {
                     resolve(response)
                 },
                 error => {
                     reject(error)
                 });
         });
     },
     store(_, payload) {
         return new Promise((resolve, reject) => {
             axios.defaults.headers.common["Authorization"] =
                 "Bearer " + localStorage.getItem("access_token");
             axios.post('http://127.0.0.1:8000/api/store-todo', { text: payload.text, }).then(
                 response => {
                     resolve(response)
                 },
                 error => {
                     reject(error)
                 }
             )
         })
     }



 }
 export default {
     namespaced: true,
     state,
     getters,
     mutations,
     actions
 }