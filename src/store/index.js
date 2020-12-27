import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tableData: [{
        date: "1",
        name: "桂林米粉",
        address: "上海",
        state: 0,
        icon: "el-icon-user-solid"
      },
      {
        date: "2",
        name: "沙县小吃",
        address: "北京",
        state: 0,
        icon: "el-icon-user-solid"
      },
      {
        date: "3",
        name: "兰州拉面",
        address: "深圳",
        state: 1,
        icon: "el-icon-user-solid"
      },
      {
        date: "4",
        name: "黄焖鸡米饭",
        address: "广州",
        state: 1,
        icon: "el-icon-user-solid"
      },
    ],
  },
  mutations: {
    settableData(state, meun) {
      state.tableData.push(meun)
    }
  }
})
