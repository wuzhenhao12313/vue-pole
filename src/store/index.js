import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);


// 导出 store 对象
export default new Vuex.Store({
    getters,
    actions,
    mutations,
    modules: {}
})