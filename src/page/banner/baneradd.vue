<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/banner' }"
                >轮播图管理</el-breadcrumb-item
            >
            <el-breadcrumb-item>轮播图{{ tip }}页面</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
            label-width="120px"
            style="width: 800px"
            :rules="rules"
            ref="banner"
            :model="banner"
        >
            <el-form-item label="轮播图名称" prop="title">
                <el-input v-model="banner.title"></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="img">
                <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false"
                    :on-change="change"
                    :file-list="upload"
                >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{ file }">
                        <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.url"
                            alt=""
                        />
                        <span class="el-upload-list__item-actions">
                            <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                            >
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span
                                v-if="!disabled"
                                class="el-upload-list__item-delete"
                                @click="handleRemove(file)"
                            >
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
            </el-form-item>
            <el-form-item label="状态">
                <el-switch
                    v-model="banner.status"
                    :active-value="1"
                    :inactive-value="2"
                ></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add('banner')"
                    >确认</el-button
                >
                <el-button @click="rtn">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    mounted() {
        if (this.$route.params.id) {
            this.tip = "修改";
            this.axios
                .get("/api/bannerinfo", { id: this.$route.params.id })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.banner = res.data.list;
                         this.upload = [{ url: this.banner.img }];
                    } else {
                        this.$message(res.data.msg);
                    }
                });
        }
    },
    data() {
        return {
            upload: [],
            tip: "添加",
            dialogImageUrl: "",
            dialogVisible: false,
            disabled: false,
            banner: {
                title: "",
                img: "",
                status: 1,
            },
            rules: {
                title: [
                    {
                        required: true,
                        message: "请填写名称",
                        trigger: "blur",
                    },
                ],
                img: [
                    {
                        required: true,
                        message: "请添加图片",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        change(file) {
            this.banner.img = file.raw;
            this.dialogImageUrl = file.url;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleRemove(file) {
            this.upload = [];
        },
        add(banner) {
            let url = "/api/banneradd";
            if (this.$route.params.id) {
                url = "/api/goodsedit";
                this.banner.id = this.$route.params.id;
            }
            this.$refs[banner].validate((valid) => {
                if (valid) {
                    let form = new FormData();
                    for (let i in this.banner) {
                        form.append(i, this.banner[i]);
                    }
                    this.axios.post(url, form).then((res) => {
                        if (res.data.code == 200) {
                            this.$router.push("/banner");
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