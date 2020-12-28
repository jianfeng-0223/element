<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/cate' }"
                >商品管理</el-breadcrumb-item
            >
            <el-breadcrumb-item>商品添加页面</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
            label-width="120px"
            style="width: 500px"
            :rules="rules"
            ref="shop"
            :model="shop"
        >
            <el-form-item label="上级分类编号" prop="pid">
                <el-input v-model="shop.pid"></el-input>
            </el-form-item>
            <el-form-item label="商品分类名称" prop="catename">
                <el-input v-model="shop.catename"></el-input>
            </el-form-item>
            <el-form-item label="图片">
                <el-image
                    style="width: 100px; height: 100px"
                    :src="shop.img"
                ></el-image>
            </el-form-item>
            <el-form-item label="商品状态">
                <el-switch
                    v-model="shop.status"
                    :active-value="1"
                    :inactive-value="2"
                ></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add('shop')">确认</el-button>
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
            axios
                .get("/api/cateinfo?id=" + this.$route.params.id)
                .then((res) => {
                    this.shop = res.data.list;
                });
        }
    },
    data() {
        return {
            shop: {
                tip: "添加",
                pid: 0,
                catename: "",
                img:"1",
                status: 1,
            },
            rules: {
                pid: [
                    {
                        required: true,
                        message: "请填写值",
                        trigger: "blur",
                    },
                ],
                catename: [
                    {
                        required: true,
                        message: "请填写商品名称",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        add(shop) {
            let url = "/api/cateadd";
            if (this.$route.params.id) {
                url = "/api/cateedit";
                this.shop.id = this.$route.params.id;
            }
            this.$refs[shop].validate((valid) => {
                if (valid) {
                    axios.post(url, this.shop).then((res) => {
                        if (res.data.code == 200) {
                            this.$router.push("/cate");
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
</style>