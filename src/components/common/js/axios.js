import axios from "axios"
import store from "../../../store"


function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      params,
      headers: {
        Authorization: store.state.tableData.token,
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

function post(url, data) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: "post",
      data,
      headers: {
        Authorization: store.state.tableData.token,
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export default {
  get,
  post
}
