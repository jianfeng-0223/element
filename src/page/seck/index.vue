<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item></el-breadcrumb
        >
        <el-button type="primary" size="medium" @click="add" class="addbutton"
            >添加</el-button
        >
        <el-table :data="seckData" stripe style="width: 100%" border>
            <el-table-column prop="id" label="商品编号"> </el-table-column>
            <el-table-column prop="title" label="商品名称"> </el-table-column>
            <el-table-column prop="begintime" label="开始时间">
            </el-table-column>
            <el-table-column prop="endtime" label="结束时间"> </el-table-column>
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
                        @click="$router.push('/seck/' + item.row.id)"
                        >编辑</el-button
                    >
                    <el-button
                        type="danger"
                        size="small"
                        @click="del(item.row.id)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import moment from "moment";
export default {
    mounted() {
        this.axios.get("/api/secklist").then((res) => {
            if (res.data.code == 200) {
                this.seckData = res.data.list;
                this.seckData.forEach((val) => {
                    val.begintime = moment(parseInt(val.begintime)).format(
                        "YYYY/MM/DD hh:mm:ss"
                    );
                    val.endtime = moment(parseInt(val.endtime)).format(
                        "YYYY/MM/DD hh:mm:ss"
                    );
                });
            }
        });
    },
    methods: {
        add() {
            this.$router.push("seck/add");
        },
        del(id) {
            //   this.tableData.splice(v, 1);
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.axios.post("/api/seckdelete", { id }).then((res) => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                            this.seckData = res.data.list;
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
            seckData: [],
            begin: [],
            end: [],
        };
    },
};
</script>

<style scoped>
.addbutton {
    margin-bottom: 10px;
}
.margin {
    margin-bottom: 5px;
}
</style>