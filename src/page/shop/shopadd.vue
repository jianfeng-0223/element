<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/cate' }"
                >商品管理</el-breadcrumb-item
            >
            <el-breadcrumb-item>商品{{ tip }}页面</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
            label-width="120px"
            style="width: 500px"
            :rules="rules"
            ref="shop"
            :model="shop"
        >
            <el-form-item label="商品上级分类" prop="pid">
                <el-select v-model="shop.pid" placeholder="请选择商品分类">
                    <el-option label="顶级分类" :value="0"></el-option>
                    <el-option
                        v-for="val in catearr"
                        :label="val.catename"
                        :key="val.id"
                        :value="val.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品分类名称" prop="catename">
                <el-input v-model="shop.catename"  placeholder="请输入商品分类名称"></el-input>
            </el-form-item>
            <el-form-item label="上传图片" prop="img">
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
export default {
    mounted() {
        if (this.$route.params.id) {
            this.tip = "修改";
            this.axios
                .get("/api/cateinfo?id=" + this.$route.params.id)
                .then((res) => {
                    if (res.data.code == 200) {
                        this.shop = res.data.list;
                    } else {
                        this.$message(res.data.msg);
                    }
                });
        }
        this.axios.get("/api/catelist").then((res) => {
            if (res.data.code == 200) {
                this.catearr = res.data.list;
                if(this.shop.img){
                    this.upload=[{url:this.shop.img}]
                }
                
            }
        });
    },
    data() {
        return {
            dialogImageUrl: "",
            dialogVisible: false,
            disabled: false,
            tip: "添加",
            catearr: [],
            upload:[],
            shop: {
                pid: 0,
                catename: "",
                img: "",
                status: 1,
            },
            rules: {
                pid: [
                    {
                        required: true,
                        message: "请选择分类",
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
                img: [
                    {
                        required: true,
                        message: "请上传图片",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        change(file) {
            this.shop.img = file.raw;
            this.dialogImageUrl = file.url;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleRemove(file) {
            this.upload=[]
        },
        add(shop) {
            let url = "/api/cateadd";
            if (this.$route.params.id) {
                url = "/api/cateedit";
                this.shop.id = this.$route.params.id;
            }
            this.$refs[shop].validate((valid) => {
                if (valid) {
                    let form = new FormData();
                    for (let i in this.shop) {
                        form.append(i, this.shop[i]);
                    }
                    this.axios.post(url, form).then((res) => {
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
.addbutton {
    margin-bottom: 10px;
}
</style>