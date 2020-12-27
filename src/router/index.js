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
        path: "menu/add",
        component: () => import("../page/addmenu.vue"),
        meta: {
          selected: "/menu"
        }
      }, {
        path: "menu/:id",
        component: () => import("../page/addmenu.vue"),
        meta: {
          selected: "/menu"
        }
      },
      {
        path: "role",
        component: () => import("../page/role/index.vue"),
        meta: {
          selected: "/role"
        }
      }, {
        path: "role/add",
        component: () => import("../page/role/roleadd.vue"),
        meta: {
          selected: "/role"
        }
      }, {
        path: "role/:id",
        component: () => import("../page/role/roleadd.vue"),
        meta: {
          selected: "/role"
        }
      },
      {
        path: "user",
        component: () => import("../page/user/index.vue"),
        meta: {
          selected: "/user"
        }
      }, {
        path: "user/add",
        component: () => import("../page/user/useradd.vue"),
        meta: {
          selected: "/user"
        }
      }, {
        path: "user/:id",
        component: () => import("../page/user/useradd.vue"),
        meta: {
          selected: "/user"
        }
      }
    ]
  }]
})
