<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品规格管理</el-breadcrumb-item></el-breadcrumb
        >
        <el-button type="primary" size="medium" @click="add" class="addbutton"
            >添加</el-button
        >
        <el-table
            :data="specsData"
            stripe
            style="width: 100%"
            border
            row-key="id"
            :tree-props="{ children: 'children' }"
        >
            <el-table-column prop="id" label="商品规格编号"> </el-table-column>
            <el-table-column prop="specsname" label="商品规格名称">
            </el-table-column>
            <el-table-column prop="attrs" label="商品规格属性">
                <template slot-scope="val">
                    <el-tag type="danger" v-for="(item, ind) in val.row.attrs" :key="ind">
                        {{ item }}</el-tag
                    >
                </template>
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
                        @click="$router.push('/specs/' + item.row.id)"
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
export default {
    mounted() {
        this.axios.get("/api/specslist").then((res) => {
            if (res.data.code == 200) {
                this.specsData = res.data.list;
            }
        });
    },
    data() {
        return {
            specsData: [],
        };
    },
    methods: {
        add() {
            this.$router.push("specs/add");
        },
        del(id) {
            //   this.tableData.splice(v, 1);
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.axios.post("/api/specsdelete", { id }).then((res) => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                            this.specsData = res.data.list;
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
};
</script>

<style scoped>
.addbutton {
    margin-bottom: 10px;
}
.imgSize {
    width: 120px;
    height: 80px;
}
.el-tag{
    margin-right: 5px;
}
</style>