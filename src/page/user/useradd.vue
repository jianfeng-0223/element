<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/user' }"
                >管理员管理</el-breadcrumb-item
            >
            <el-breadcrumb-item>管理员{{ tip }}页面</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
            label-width="100px"
            style="width: 400px"
            :rules="rules"
            ref="user"
            :model="user"
        >
            <el-form-item label="所属角色" prop="roleid">
                <el-select placeholder="请选择角色" v-model="user.roleid">
                    <el-option
                        v-for="val in userarr"
                        :key="val.id"
                        :label="val.rolename"
                        :value="val.id"
                    ></el-option
                ></el-select>
            </el-form-item>
            <el-form-item label="管理员名称" prop="username">
                <el-input v-model="user.username"  placeholder="请输入写管理员名称"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" >
                <el-input v-model="user.password" type="password"  placeholder="请输入密码"></el-input>
                <span class="sp1" v-if="$route.params.id">留空则不修改</span>
            </el-form-item>
            <el-form-item label="管理状态">
                <el-switch
                    v-model="user.status"
                    :active-value="1"
                    :inactive-value="2"
                ></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add('user')">确认</el-button>
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
            userarr: [],
            user: { roleid: "", username: "", password: "", status: 1 },
            rules: {
                roleid: [
                    {
                        required: true,
                        message: "选择所属角色",
                        trigger: "blur",
                    },
                ],
                username: [
                    {
                        required: true,
                        message: "请输入管理员名称",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    mounted() {
        if (this.$route.params.id) {
            this.tip = "修改";
            this.axios
                .get("/api/userinfo?uid=" + this.$route.params.id)
                .then((res) => {
                    this.user = res.data.list;
                    this.user.password = "";
                });
        }
        this.axios.get("/api/rolelist").then((res) => {
            this.userarr = res.data.list;
        });
    },
    methods: {
        add(user) {
            let url = "/api/useradd";
            if (this.$route.params.id) {
                url = "/api/useredit";
                this.user.uid = this.$route.params.id;
            }
            // validate表单验证方法
            this.$refs[user].validate((valid) => {
                if (valid) {
                    this.axios.post(url, this.user).then((res) => {
                        if (res.data.code == 200) {
                            this.$router.push("/user");
                        }
                    });
                } else {
                    return false;
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
.sp1 {
    color: green;
}
</style>