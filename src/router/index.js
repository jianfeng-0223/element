import Vue from "vue"
import vueRouter from "vue-router"

Vue.use(vueRouter)

export default new vueRouter({
  routes: [{
    path: "/",
    meta: {
      selected: "/"
    },
    component: () => import("@/page/index.vue"),
    children: [{
      path: "menu",
      component: () => import("../page/menu.vue"),
      meta: {
        selected: "/menu"
      }
    }, {
      path: "menu/:id",
      component: () => import("../page/addmenu.vue"),
      meta: {
        selected: "/menu"
      }
    }, {
      path: "menu/add",
      component: () => import("../page/addmenu.vue"),
      meta: {
        selected: "/menu"
      }
    }]
  }]
})
