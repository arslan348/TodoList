import { createStore } from 'vuex'
import registerModule from '../module/index'
import todolist from './todolist'
import mainStore from './mainStore'
const store = createStore({
    modules: {
        registerModule,
        mainStore,
        todolist
    },

})
export default store