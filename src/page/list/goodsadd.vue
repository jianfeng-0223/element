<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/goods' }"
                >商品管理</el-breadcrumb-item
            >
            <el-breadcrumb-item>商品{{ tip }}页面</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
            label-width="120px"
            style="width: 800px"
            :rules="rules"
            ref="goods"
            :model="goods"
        >
            <el-form-item label="一级分类" prop="first_cateid">
                <el-select v-model="goods.first_cateid" @change="catechange">
                    <el-option value="">请选择</el-option>
                    <el-option
                        v-for="val in firstarr"
                        :key="val.id"
                        :value="val.id"
                        :label="val.catename"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" prop="second_cateid">
                <el-select v-model="goods.second_cateid">
                    <el-option
                        v-for="val in secondarr"
                        :key="val.id"
                        :value="val.id"
                        :label="val.catename"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称" prop="goodsname">
                <el-input v-model="goods.goodsname"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
                <el-input v-model="goods.price"></el-input>
            </el-form-item>
            <el-form-item label="市场价格">
                <el-input v-model="goods.market_price"></el-input>
            </el-form-item>
            <el-form-item label="图片">
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
            <el-form-item label="商品规格" prop="specsid">
                <el-select v-model="goods.specsid" @change="specschange">
                    <el-option value="">请选择</el-option>
                    <el-option
                        v-for="val in specsidarr"
                        :key="val.id"
                        :value="val.id"
                        :label="val.specsname"
                    ></el-option> </el-select
            ></el-form-item>
            <el-form-item label="商品属性">
                <el-select v-model="goods.specsattr" multiple>
                    <el-option
                        v-for="(val, ind) in specsattrs"
                        :key="ind"
                        :value="val"
                        :label="val"
                    ></el-option> </el-select
            ></el-form-item>
            <el-form-item label="是否新品">
                <el-radio-group v-model="goods.isnew">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否热卖">
                <el-radio-group v-model="goods.ishot">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="状态">
                <el-switch
                    v-model="goods.status"
                    :active-value="1"
                    :inactive-value="2"
                ></el-switch>
            </el-form-item>
            <el-form-item label="商品描述">
                <div id="box"></div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add('goods')">确认</el-button>
                <el-button @click="rtn">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import wangeditor from "wangeditor";
export default {
    mounted() {
        this.editor = new wangeditor("#box");
        this.editor.create();
        this.editor.config.uploadImgShowBase64 = true;
        this.axios.get("/api/catelist", { pid: 0 }).then((res) => {
            if (res.data.code == 200) {
                this.firstarr = res.data.list;
            }
        });
        this.axios.get("/api/specslist").then((res) => {
            if (res.data.code == 200) {
                this.specsidarr = res.data.list;
            }
        });
        if (this.$route.params.id) {
            this.tip = "修改";
            this.axios
                .get("/api/goodsinfo", { id: this.$route.params.id })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.goods = res.data.list;
                        this.goods.specsattr = this.goods.specsattr
                            ? this.goods.specsattr.split(",")
                            : [];
                        this.catechange(this.goods.first_cateid);
                        this.specschange(this.goods.specsid);
                        this.editor.txt.html(this.goods.description);
                    } else {
                        this.$message(res.data.msg);
                    }
                });
        }
        this.axios.get("/api/goodslist").then((res) => {
            if (res.data.code == 200) {
                this.catearr = res.data.list;
                if (this.goods.img) {
                    this.upload = [{ url: this.goods.img }];
                }
            }
        });
        this.axios
            .get("/api/goodsinfo", { id: this.$route.params.id })
            .then((res) => {
                if (res.data.code == 200) {
                    this.goods = res.data.list;
                }
            });
    },
    data() {
        return {
            editor: null,
            dialogImageUrl: "",
            dialogVisible: false,
            disabled: false,
            upload: [],
            catearr: [],
            firstarr: [],
            secondarr: [],
            specsidarr: [],
            specsattrs: [],
            tip: "添加",
            goods: {
                first_cateid: "",
                second_cateid: "",
                goodsname: "",
                price: "",
                market_price: "",
                img: "",
                description: "",
                specsid: "",
                specsattr: "",
                isnew: 1,
                ishot: 1,
                status: 1,
            },
            rules: {
                first_cateid: [
                    {
                        required: true,
                        message: "请填选择一级分类",
                        trigger: "blur",
                    },
                ],
                second_cateid: [
                    {
                        required: true,
                        message: "请填选择二级分类",
                        trigger: "blur",
                    },
                ],
                goodsname: [
                    {
                        required: true,
                        message: "请填写商品名称",
                        trigger: "blur",
                    },
                ],
                specsid: [
                    {
                        required: true,
                        message: "请选择商品规格",
                        trigger: "blur",
                    },
                ],
                specsattr: [
                    {
                        required: true,
                        message: "请选择商品属性",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        catechange(n) {
            if (n == "") {
                this.goods.second_cateid = "";
                return;
            }
            this.axios.get("/api/catelist", { pid: n }).then((res) => {
                if (res.data.code == 200) {
                    this.secondarr = res.data.list;
                }
            });
        },
        specschange(v) {
            if (v == "") {
                this.goods.specsattr = "";
                return;
            }
            this.axios.get("/api/specsinfo", { id: v }).then((res) => {
                if (res.data.code == 200) {
                    this.specsattrs = res.data.list[0].attrs;
                }
            });
        },
        change(file) {
            this.goods.img = file.raw;
            this.dialogImageUrl = file.url;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleRemove(file) {
            this.upload = [];
        },
        add(goods) {
            this.goods.description = this.editor.txt.html();
            // console.log(this.goods.description);
            let url = "/api/goodsadd";
            if (this.$route.params.id) {
                url = "/api/goodsedit";
                this.goods.id = this.$route.params.id;
            }
            this.$refs[goods].validate((valid) => {
                if (valid) {
                    this.goods.specsattr = this.goods.specsattr
                        ? this.goods.specsattr.join(",")
                        : "";
                    let form = new FormData();
                    for (let i in this.goods) {
                        form.append(i, this.goods[i]);
                    }
                    this.axios.post(url, form).then((res) => {
                        if (res.data.code == 200) {
                            this.$router.push("/goods");
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
.btn {
    position: absolute;
    right: -80px;
    top: 3px;
}
.form-btn {
    position: relative;
}
</style>    