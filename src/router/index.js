import Vue from "vue"
import vueRouter from "vue-router"

Vue.use(vueRouter)

const router = new vueRouter({
  routes: [{
      path: "/",
      meta: {
        selected: "/"
      },
      component: () => import("@/page/index.vue"),
      children: [{
          path: "/home",
          component: () => import("../home.vue"),
          meta: {
            selected: "/home"
          }
        }, {
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
        },
        {
          path: "cate",
          component: () => import("../page/shop/index.vue"),
          meta: {
            selected: "/cate"
          }
        }, {
          path: "cate/add",
          component: () => import("../page/shop/shopadd.vue"),
          meta: {
            selected: "/cate"
          }
        }, {
          path: "cate/:id",
          component: () => import("../page/shop/shopadd.vue"),
          meta: {
            selected: "/cate"
          }
        },
        {
          path: "specs",
          component: () => import("../page/goods/index.vue"),
          meta: {
            selected: "/specs"
          }
        }, {
          path: "specs/add",
          component: () => import("../page/goods/specs.vue"),
          meta: {
            selected: "/specs"
          }
        }, {
          path: "specs/:id",
          component: () => import("../page/goods/specs.vue"),
          meta: {
            selected: "/specs"
          }
        },
        {
          path: "goods",
          component: () => import("../page/list/goods.vue"),
          meta: {
            selected: "/goods"
          }
        }, {
          path: "goods/add",
          component: () => import("../page/list/goodsadd.vue"),
          meta: {
            selected: "/goods"
          }
        }, {
          path: "goods/:id",
          component: () => import("../page/list/goodsadd.vue"),
          meta: {
            selected: "/goods"
          }
        },
        {
          path: "banner",
          component: () => import("../page/banner/index.vue"),
          meta: {
            selected: "/banner"
          }
        }, {
          path: "banner/add",
          component: () => import("../page/banner/baneradd.vue"),
          meta: {
            selected: "/banner"
          }
        }, {
          path: "banner/:id",
          component: () => import("../page/banner/baneradd.vue"),
          meta: {
            selected: "/banner"
          }
        },
        {
          path: "seck",
          component: () => import("../page/seck/index.vue"),
          meta: {
            selected: "/seck"
          }
        }, {
          path: "seck/add",
          component: () => import("../page/seck/seckadd.vue"),
          meta: {
            selected: "/seck"
          }
        }, {
          path: "seck/:id",
          component: () => import("../page/seck/seckadd.vue"),
          meta: {
            selected: "/seck"
          }
        }
      ]
    },
    {
      path: "/login",
      component: () => import("../page/login.vue"),
    }
  ]
})
import store from "../store"
router.beforeEach((to, from, next) => {
  if (to.fullPath == "/login") {
    next()
  } else {
    let data = store.state.tableData
    if (data == null) {
      next("/login")
    } else {
      //   console.log(to);
      // console.log(store.state.tableData.menus_url)
      let nowurl = to.meta.selected
      //   console.log(nowurl);
      let nexturl = store.state.tableData.menus_url;
      if (nexturl.indexOf("/") == -1) {
        nexturl.push("/")
        nexturl.push("/home")
      }
      if (nexturl.indexOf(nowurl) != -1) {
        next()
      } else {
        next("/")
      }
    }
  }
})
export default router
