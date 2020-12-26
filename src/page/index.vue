<template>
  <el-container class="el-container-big">
    <el-header>
      <h1 class="toptitle">流浪地球曲速引擎后台管理系统</h1>
    </el-header>
    <el-container>
      <el-aside width="220px">
        <myaside></myaside>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>
      <h1 class="copyright">版权所有,翻版必究</h1>
    </el-footer>
  </el-container>
</template>

<script>
import myaside from "../view/aside";
import axios from "axios";
export default {
  components: { myaside },
  mounted() {
    // axios.get("/su?cb=&wd=123").then(res=>{
    //   console.log(res);
    // })
    // axios.get("/api/menulist").then((res) => {
    //   console.log(res);
    // });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.el-container-big {
  width: 100vw;
  height: 100vh;
}
.el-header {
  background-color: skyblue;
}
.el-footer {
  background-color: #409eff;
}
.toptitle {
  height: 100%;
  text-align: center;
  line-height: 60px;
  font-size: 30px;
  color: hotpink;
}
.copyright {
  text-align: center;
  height: 100%;
  line-height: 60px;
  color: red;
}
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>