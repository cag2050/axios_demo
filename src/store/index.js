import Vue from 'vue'
import Vuex from 'vuex'
import * as modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        requestQueue: [],
        error: null
    },
    getters: {
        isLoading: state => state.requestQueue.length > 0,
        hasError: state => state.error !== null
    },
    mutations: {
        request (state, api) {
            state.requestQueue.push(api)
            state.error = null
        },
        success (state, api) {
            let index = state.requestQueue.indexOf(api)
            state.requestQueue.splice(index, 1)
        },
        error (state, payload) {
            let {api, error} = payload
            let index = state.requestQueue.indexOf(api)
            state.requestQueue.splice(index, 1)
            state.error = error
        },
        resetError (state) {
            state.error = null
        }
    },
    modules: modules,
    strict: process.env.NODE_ENV !== 'production'
})
