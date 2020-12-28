<template>
    <div class="login">
        <el-form
            label-width="100px"
            style="width: 500px"
            :rules="rules"
            ref="login"
            :model="login"
        >
            <h1 class="h1">登录页</h1>
            <el-form-item label="用户名" prop="username" class="label">
                <el-input
                    v-model="login.username"
                    placeholder="请输入用户名"
                ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                    v-model="login.password"
                    type="password"
                    placeholder="请输入密码"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="loginadd('login')"
                    >确认</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    methods: {
        loginadd(menuform) {
            this.$refs[menuform].validate((valid) => {
                if (valid) {
                    axios.post("/api/userlogin", this.login).then((res) => {
                        if (res.data.code == 200) {
                            this.$store.dispatch("settable", res.data.list);
                            // console.log(res);
                            this.$router.push("/");
                        } else {
                            this.$message(res.data.msg);
                        }
                    });
                } else {
                    return false;
                }
            });
        },
    },
    data() {
        return {
            login: {
                username: "",
                password: "",
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        max: 15,
                        message: "长度在 3 到 15 个字符",
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
                        min: 3,
                        max: 15,
                        message: "长度在 3 到 15 个字符",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
};
</script>

<style scoped>
html,
body {
    margin: 0;
    padding: 0;
}
.login {
    width: 100vw;
    height: 100vh;
    background: url(../../static/img/1.jpg);
    position: fixed;
}
.el-form {
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 300px;
    margin: 150px auto;
    text-align: center;
    padding-right: 30px;
    padding-top: 1px;
    border-radius: 15px;
}
.el-button {
    width: 100%;
}
.h1 {
    margin-bottom: 10px;
    padding-top: 10px;
    padding-left: 40px;
    color: tomato;
}
</style>