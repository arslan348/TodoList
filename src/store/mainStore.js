import router from '../router'
const state = () => {
    return {
        access_token: localStorage.getItem('access_token'),
        loggedIn: false
    }
}
const getters = {
    LoggedIn: (state) => {
        return state.loggedIn
    },
    access_token: (state) => {
        return state.access_token
    }
}
const mutations = {
    setAccessToken: (state, payload) => {

        state.access_token = payload
    },
    setLoggedIn: (state, payload) => {
        state.loggedIn = payload
    }
}
const actions = {

    logout: ({ commit }) => {
        console.log("hello amir")
        localStorage.removeItem('access_token')
        commit('setAccessToken', {
            access_token: ''
        })
        commit('setLoggedIn', false)
        router.push('/login');
    },

    auto_logout: (context) => {
        var userData = localStorage.getItem('access_token')
        if (userData) {
            context.commit('setAccessToken', userData)
            context.commit('setLoggedIn', true)
        }
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}