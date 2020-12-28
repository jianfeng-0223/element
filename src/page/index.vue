<template>
    <el-container class="el-container-big">
        <el-header>
            <p class="p1">流浪地球曲速引擎后台管理系统</p>
            <div class="welcome">
                <span>欢迎：{{ tableData ? tableData.username : " " }}</span>
                <a href="javascript:;" @click="quitout">安全退出</a>
            </div>
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
import { mapState } from "vuex";
export default {
    components: { myaside },
    computed: {
        ...mapState(["tableData"]),
    },
    methods: {
        quitout() {
            this.$store.dispatch("settable");
            this.$router.replace("/login");
        },
    },
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

.copyright {
    text-align: center;
    height: 100%;
    line-height: 60px;
    color: red;
}
.el-breadcrumb {
    margin-bottom: 20px;
}
.p1 {
    float: left;
    font-size: 30px;
    line-height: 60px;
    padding-left: 400px;
    color: tomato;
    font-weight: 600;
}
.welcome {
    float: right;
    line-height: 60px;
    padding-right: 30px;
    font-size: 18px;
}
.welcome a {
    color: #fff;
    font-size: 14px;
    margin-left: 20px;
    text-decoration: none;
    padding: 8px;
    border-radius: 8px;
    background-color: tomato;
}
</style>