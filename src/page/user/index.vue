<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>管理员管理</el-breadcrumb-item></el-breadcrumb
        >
        <el-button type="primary" size="medium" @click="add" class="addbutton"
            >添加</el-button
        >
        <el-table :data="userData" stripe style="width: 100%" border>
            <el-table-column prop="id" label="管理员编号"> </el-table-column>
            <el-table-column prop="rolename" label="所属角色">
            </el-table-column>
            <el-table-column prop="username" label="管理员名称">
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="item">
                    <el-tag
                        type="success"
                        size="small"
                        v-if="item.row.status == 1"
                        >启用</el-tag
                    >
                    <el-tag type="danger" size="small" v-else>禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="item">
                    <el-button
                        type="primary"
                        size="small"
                        @click="$router.push('/user/' + item.row.uid)"
                        >编辑</el-button
                    >
                    <el-button
                        type="danger"
                        size="small"
                        @click="del(item.row.uid)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            layout="prev, pager, next"
            :total="totle"
            :page-size="size"
            :background="true"
            @current-change="changePage"
        >
        </el-pagination>
    </div>
</template>

<script>
import axios from "axios";
export default {
    methods: {
        changePage(num) {
            axios
                .get("/api/userlist?size=" + this.size + "&page=" + num)
                .then((res) => {
                    this.userData = res.data.list;
                });
        },
        add() {
            this.$router.push("user/add");
        },
        del(uid) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    axios.post("/api/userdelete", { uid }).then((res) => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                            this.userData = res.data.list;
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
    },
    data() {
        return {
            totle: 0,
            page: 1,
            size: 3,
            userData: [],
        };
    },
    mounted() {
        axios
            .get("/api/userlist?size=" + this.size + "&page=" + this.page)
            .then((res) => {
                this.userData = res.data.list;
            });
        axios.get("/api/usercount").then((res) => {
            this.totle = res.data.list[0].total;
        });
    },
};
</script>

<style>
.addbutton {
    margin-bottom: 10px;
}
.el-pagination{
    margin-top: 20px;
}
</style>