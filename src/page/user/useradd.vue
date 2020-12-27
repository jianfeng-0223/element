<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/user' }"
                >管理员管理</el-breadcrumb-item
            >
            <el-breadcrumb-item>管理员{{ tip }}页面</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form label-width="100px" style="width: 600px" :rules="rules">
            <el-form-item label="角色编号" prop="userid">
                <el-input v-model="user.userid"></el-input>
            </el-form-item>
            <el-form-item label="管理员名称" prop="username">
                <el-input v-model="user.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item label="管理状态">
                <el-switch
                    v-model="user.status"
                    :active-value="1"
                    :inactive-value="2"
                ></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add">立即添加</el-button>
                <el-button @click="rtn">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            tip: "添加",
            user: { userid: "", username: "", password: "", status: 1 },
            rules: {
                userid: [
                    {
                        required: true,
                        message: "请输入角色编号",
                        trigger: "blur",
                    },
                ],
                username: [
                    {
                        required: true,
                        message: "请输入角色名称",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                    {
                        min: 6,
                        max: 15,
                        message: "长度在 6 到 15 个字符",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    mounted() {
        axios.get("/api/rolelist").then(res=>{
            if (res.data.code == 200) {
                   console.log(res);
                }
        })
    },
    methods: {
        add() {
            axios.post("/api/useradd", this.uesr).then((res) => {
                if (res.data.code == 200) {
                    this.$router.push("/user");
                }
            });
        },
        rtn() {
            this.$router.go(-1);
        },
    },
};
</script>

<style>
</style>