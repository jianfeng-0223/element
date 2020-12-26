<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/menu' }"
                >菜单管理</el-breadcrumb-item
            >
            <el-breadcrumb-item>{{ tip }}页面</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
            label-width="100px"
            class="demo-ruleForm"
            style="width: 600px"
            :model="menu"
            :rules="rules"
            ref="menu"
        >
            <el-form-item label="菜单名称" prop="title">
                <el-input v-model="menu.title"></el-input>
            </el-form-item>
            <el-form-item label="上级菜单" prop="pid">
                <el-select
                    v-model="menu.pid"
                    placeholder="请选择菜单"
                    @change="changepid"
                >
                    <el-option label="顶级菜单" :value="0"></el-option>
                    <el-option
                        v-for="val in menuarr"
                        :key="val.id"
                        :label="val.title"
                        :value="val.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单类型" prop="type">
                <el-radio-group v-model="menu.type">
                    <el-radio :label="1">目录</el-radio>
                    <el-radio :label="2">菜单</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单图标" v-show="menu.type == 1">
                <el-input type="text" v-model="menu.icon"></el-input>
            </el-form-item>
            <el-form-item label="菜单地址" v-show="menu.type == 2">
                <el-input type="text" v-model="menu.url"></el-input>
            </el-form-item>
            <el-form-item label="菜单状态">
                <el-switch
                    v-model="menu.status"
                    :active-value="1"
                    :inactive-value="2"
                ></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addmenu('menu')"
                    >立即添加</el-button
                >
                <el-button @click="rtn">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from "axios";
// import { mapMutations } from "vuex";
export default {
    mounted() {
        // console.log(this.$route);
        if (this.$route.params.id != "add") {
            this.tip = "修改";
            axios
                .get("/api/menuinfo?id=" + this.$route.params.id)
                .then((res) => {
                    this.menu = res.data.list;
                });
        }
        axios({
            url: "/api/menulist",
            params: { pid: 0 },
        }).then((res) => {
            this.menuarr = res.data.list;
        });
    },
    methods: {
        changepid() {
            // console.log(this.menu.pid);
            this.menu.type = this.menu.pid == 0 ? 1 : 2;
        },
        // ...mapMutations(["settableData"]),
        addmenu(menuform) {
            // this.settableData(this.menu);
            // this.$router.push("/menu");
            let url = "/api/menuadd";
            if (this.$route.params.id != "add") {
                url = "/api/menuedit";
                this.menu.id = this.$route.params.id;
            }
            this.$refs[menuform].validate((valid) => {
                if (valid) {
                    axios.post(url, this.menu).then((res) => {
                        if (res.data.code == 200) {
                            this.$router.push("/menu");
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
    data() {
        return {
            tip: "添加",
            menuarr: [],
            menu: {
                pid: "",
                title: "",
                type: 1,
                icon: "",
                url: "",
                status: 1,
            },
            rules: {
                title: [
                    {
                        required: true,
                        message: "请输入菜单名称",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "长度在 3 到 10 个字符",
                        trigger: "blur",
                    },
                ],
                pid: [
                    {
                        required: true,
                        message: "请选择菜单",
                        trigger: "change",
                    },
                ],
                type: [
                    {
                        required: true,
                        message: "请选择活动资源",
                        trigger: "change",
                    },
                ],
                icon: [
                    {
                        required: true,
                        message: "请输入菜单图标",
                        trigger: "blur",
                    },
                ],
                url: [
                    {
                        required: true,
                        message: "请输入菜单地址",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
};
</script>

<style>
</style>