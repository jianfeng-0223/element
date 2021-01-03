<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item></el-breadcrumb
        >
        <el-button type="primary" size="medium" @click="add" class="addbutton"
            >添加</el-button
        >
        <el-table :data="goodsData" stripe style="width: 100%" border>
            <el-table-column prop="id" label="商品编号"> </el-table-column>
            <el-table-column prop="goodsname" label="商品名称">
            </el-table-column>
            <el-table-column prop="price" label="商品价格"> </el-table-column>
            <el-table-column prop="market_price" label="市场价格">
            </el-table-column>
            <el-table-column prop="img" label="图片"
                ><template slot-scope="val">
                    <img :src="val.row.img" alt="" class="imgSize" />
                </template>
            </el-table-column>
            <el-table-column prop="isnew" label="是否新品">
                <template slot-scope="item">
                    <el-tag
                        type="success"
                        size="small"
                        v-if="item.row.isnew == 1"
                        >是</el-tag
                    >
                    <el-tag type="danger" size="small" v-else>否</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="ishot" label="是否热卖">
                <template slot-scope="item">
                    <el-tag
                        type="success"
                        size="small"
                        v-if="item.row.ishot == 1"
                        >是</el-tag
                    >
                    <el-tag type="danger" size="small" v-else
                        >否</el-tag
                    ></template
                ></el-table-column
            >
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
            <!-- <el-table-column prop="description" label="商品描述"> <template slot-scope="val">
                <img :src="'data:image/jpeg;base64,+'val.row.img" alt="" class="imgSize">
                </template></el-table-column> -->
            <el-table-column label="操作">
                <template slot-scope="item">
                    <el-button
                        type="primary"
                        size="small"
                        @click="$router.push('/goods/' + item.row.id)"
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
        <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="size"
            :background="true"
            @current-change="changePage"
        >
        </el-pagination>
    </div>
</template>

<script>
import qs from "qs";
export default {
    mounted() {
        let obj = { page: this.page, size: this.size };
        let str = qs.stringify(obj);
        this.axios.get("/api/goodslist?" + str).then((res) => {
            if (res.data.code == 200) {
                this.goodsData = res.data.list;
            }
        });
        this.axios.get("/api/goodscount").then((res) => {
            if (res.data.code == 200) {
                this.total = res.data.list[0].total;
            }
        });
    },
    data() {
        return {
            size: 4,
            page: 1,
            total: 0,
            goodsData: [],
        };
    },
    methods: {
        changePage(n) {
            let obj = { page: n, size: this.size };
            let str = qs.stringify(obj);
            this.axios.get("/api/goodslist?" + str).then((res) => {
                this.goodsData = res.data.list;
            });
        },
        add() {
            this.$router.push("goods/add");
        },
        del(id) {
            //   this.tableData.splice(v, 1);
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.axios.post("/api/goodsdelete", { id }).then((res) => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                            this.goodsData = res.data.list;
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
.el-pagination {
    margin-top: 20px;
}
</style>