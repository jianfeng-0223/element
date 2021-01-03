<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/role' }"
                >角色管理</el-breadcrumb-item
            >
            <el-breadcrumb-item>角色{{ tip }}页面</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
            label-width="100px"
            class="demo-ruleForm"
            style="width: 600px"
            :model="role"
            :rules="rules"
            ref="role"
        >
            <el-form-item label="角色名称" prop="rolename">
                <el-input v-model="role.rolename"  placeholder="请输角色名称"></el-input>
            </el-form-item>
            <el-form-item label="角色权限">
                <el-tree
                    :data="rolearr"
                    :props="{ label: 'title' }"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    check-strictly
                    :default-checked-keys="checkedKeys"
                    :default-expanded-keys="checkedKeys"
                ></el-tree>
            </el-form-item>
            <el-form-item label="角色状态">
                <el-switch
                    v-model="role.status"
                    :active-value="1"
                    :inactive-value="2"
                ></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addmenu('role')"
                    >立即添加</el-button
                >
                <el-button @click="rtn">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    mounted() {
        if (this.$route.params.id) {
            this.tip = "修改";
            this.axios
                .get("/api/roleinfo?id=" + this.$route.params.id)
                .then((res) => {
                    this.role = res.data.list;
                    this.checkedKeys = this.role.menus
                        ? this.role.menus.split(",").map((val) => {
                              return Number(val);
                          })
                        : [];
                });
        }
        this.axios.get("/api/menulist?istree=1").then((res) => {
            this.rolearr = res.data.list;
        });
    },
    methods: {
        addmenu(roleform) {
            let url = "/api/roleadd";
            if (this.$route.params.id) {
                url = "/api/roleedit";
                this.role.id = this.$route.params.id;
            }
            this.role.menus = this.$refs.tree.getCheckedKeys()
                ? this.$refs.tree.getCheckedKeys().join(",")
                : "";
            this.$refs[roleform].validate((valid) => {
                if (valid) {
                    this.axios.post(url, this.role).then((res) => {
                        if (res.data.code == 200) {
                            this.$router.push("/role");
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
            checkedKeys: [],
            rolearr: [],
            role: {
                rolename: "",
                menus: "",
                status: 1,
            },
            rules: {
                rolename: [
                    {
                        required: true,
                        message: "请输入角色名称",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        max: 10,
                        message: "长度在 3 到 10 个字符",
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