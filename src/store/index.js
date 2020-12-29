import Vue from "vue"
import Vuex from "vuex"
import creatPersistedState from "vuex-persistedstate"



Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [creatPersistedState()],
  state: {
    tableData: null
  },
  mutations: {
    settableData(state, data) {
      state.tableData = data
    }
  },
  actions: {
    settable(context, data = null) {
      context.commit("settableData", data)
      //   console.log(context);
    }
  }
})
