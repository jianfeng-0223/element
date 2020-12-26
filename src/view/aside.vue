<template>
  <el-menu
    :default-active="default_active"
    class="el-menu-vertical-demo"
    router
    unique-opened
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/"><i class="el-icon-house"></i>首页</el-menu-item>
    <el-submenu :index="val.icon" v-for="val in navmenu" :key="val.id">
      <template slot="title">
        <i :class="val.icon"></i>
        <span>{{val.title}}</span>
      </template>
      <el-menu-item v-for="item in val.children" :key="item.id" :index="item.url">{{item.title}}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      navmenu: [],
      default_active: "",
    };
  },
  mounted() {
    this.default_active = this.$route.meta.selected;
    axios({
      url: "/api/menulist",
      params: { istree: 1 },
    }).then((res) => {
      this.navmenu = res.data.list;
    });
  },
  watch: {
    $route(newval) {
      this.default_active = newval.meta.selected;
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100%;
  background-color: #545c64;
}
</style>