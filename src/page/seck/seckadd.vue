<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/seck' }"
                >限时秒杀管理</el-breadcrumb-item
            >
            <el-breadcrumb-item>限时秒杀{{ tip }}页面</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
            label-width="120px"
            style="width: 800px"
            :rules="rules"
            ref="seck"
            :model="seck"
        >
            <el-form-item label="限时秒杀名称" prop="title"
                ><el-input v-model="seck.title"> </el-input
            ></el-form-item>
            <el-form-item label="活动期限">
                <el-date-picker
                    v-model="value1"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="商品一级分类">
                <el-select v-model="seck.first_cateid" @change="changefirst">
                    <el-option value="" label="请选择"></el-option>
                    <el-option
                        v-for="val in catearr"
                        :key="val.id"
                        :label="val.catename"
                        :value="val.id"
                    ></el-option> </el-select
            ></el-form-item>
            <el-form-item label="商品二级分类"
                ><el-select v-model="seck.second_cateid" @change="changesecond">
                    <el-option value="" label="请选择"></el-option>
                    <el-option
                        v-for="val in catearr2"
                        :key="val.id"
                        :label="val.catename"
                        :value="val.id"
                    ></el-option> </el-select
            ></el-form-item>
            <el-form-item label="商品"
                ><el-select v-model="seck.goodsid" multiple>
                    <el-option
                        v-for="val in catearr3"
                        :key="val.id"
                        :label="val.goodsname"
                        :value="val.goodsname"
                    ></el-option> </el-select
            ></el-form-item>
            <el-form-item label="状态">
                <el-switch
                    v-model="seck.status"
                    :active-value="1"
                    :inactive-value="2"
                ></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add('seck')">确认</el-button>
                <el-button @click="rtn">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import moment from "moment";
export default {
    methods: {
        add(seck) {
            this.seck.begintime = this.value1[0];
            this.seck.endtime = this.value1[1];
            let url = "/api/seckadd";
            if (this.$route.params.id) {
                url = "/api/seckedit";
                this.seck.id = this.$route.params.id;
            }
            this.$refs[seck].validate((valid) => {
                if (valid) {
                    this.seck.goodsid = this.seck.goodsid
                        ? this.seck.goodsid.join(",")
                        : "";
                    this.axios.post(url, this.seck).then((res) => {
                        if (res.data.code == 200) {
                            this.$router.push("/seck");
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
        changesecond(v) {
            this.second_cateid = v;
            this.axios
                .get("api/goodslist", {
                    fid: this.first_cateid,
                    sid: this.second_cateid,
                })
                .then((res) => {
                    this.catearr3 = res.data.list;
                });
        },
        changefirst(n) {
            this.first_cateid = n;
            this.axios.get("api/catelist", { pid: n }).then((res) => {
                if (res.data.code == 200) {
                    this.catearr2 = res.data.list;
                }
            });
        },
    },
    mounted() {
        this.axios.get("api/catelist", { pid: 0 }).then((res) => {
            if (res.data.code == 200) {
                this.catearr = res.data.list;
            }
        });
        if (this.$route.params.id) {
            this.tip = "修改";
            this.axios
                .get("/api/seckinfo", { id: this.$route.params.id })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.seck = res.data.list;
                        this.value1.push(
                            this.seck.begintime,
                            this.seck.endtime
                        );
                        this.seck.goodsid = this.seck.goodsid
                            ? this.seck.goodsid.split(",")
                            : [];
                        this.changefirst(this.seck.first_cateid);
                        this.changesecond(this.seck.second_cateid);
                    } else {
                        this.$message(res.data.msg);
                    }
                });
        }
    },
    data() {
        return {
            value1: [],
            tip: "添加",
            catearr: [],
            catearr2: [],
            catearr3: [],
            seck: {
                title: "",
                begintime: "",
                endtime: "",
                first_cateid: "",
                second_cateid: "",
                goodsid: "",
                status: 1,
            },
            rules: {
                title: [
                    {
                        required: true,
                        message: "请填写活动名称",
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