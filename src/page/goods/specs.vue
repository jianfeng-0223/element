<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/specs' }"
                >商品规格管理</el-breadcrumb-item
            >
            <el-breadcrumb-item>商品规格{{ tip }}页面</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
            label-width="120px"
            style="width: 500px"
            :rules="rules"
            ref="specs"
            :model="specs"
        >
            <el-form-item label="商品规格名称" prop="specsname">
                <el-input
                    v-model="specs.specsname"
                    placeholder="请输入商品规格名称"
                ></el-input>
            </el-form-item>
            <el-form-item
                class="form-btn"
                label="商品规格属性"
                v-for="(val, ind) of attrsarr"
                :key="ind"
            >
                <el-input
                    v-model="val.value"
                    placeholder="请输入商品规格属性"
                ></el-input>
                <el-button
                    @click="append"
                    type="success"
                    class="btn"
                    size="medium"
                    v-if="ind == 0"
                    >增加</el-button
                >
                <el-button
                    @click="pop(ind)"
                    type="danger"
                    class="btn"
                    size="medium"
                    v-else
                    >删除</el-button
                >
            </el-form-item>
            <el-form-item label="商品状态">
                <el-switch
                    v-model="specs.status"
                    :active-value="1"
                    :inactive-value="2"
                ></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add('specs')">确认</el-button>
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
                .get("/api/specsinfo?id=" + this.$route.params.id)
                .then((res) => {
                    if (res.data.code == 200) {
                        this.specs = res.data.list[0];
                        this.specs.attrs.map((val, ind) => {
                            if (ind == 0) {
                                this.attrsarr[0].value = val;
                            } else {
                                this.attrsarr.push({ value: val });
                            }
                        });
                    } else {
                        this.$message(res.data.msg);
                    }
                });
        }
    },
    data() {
        return {
            attrsarr: [
                {
                    value: "",
                },
            ],

            tip: "添加",
            specs: {
                specsname: "",
                attrs: "",
                status: 1,
            },
            rules: {
                specsname: [
                    {
                        required: true,
                        message: "请填写规格名称",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        pop(ind) {
            this.attrsarr.splice(ind, 1);
        },
        append() {
            if (this.attrsarr.length <= 5) {
                this.attrsarr.push({
                    value: "",
                });
            }
        },
        add(specs) {
            let newarr = [];
            this.attrsarr.map((val) => {
                newarr.push(val.value);
            });
            // console.log(newarr.join(","));
            this.specs.attrs = newarr.join(",");
            // console.log(this.specs);
            let url = "/api/specsadd";
            if (this.$route.params.id) {
                url = "/api/specsedit";
                this.specs.id = this.$route.params.id;
            }
            this.$refs[specs].validate((valid) => {
                if (valid) {
                    this.axios.post(url, this.specs).then((res) => {
                        if (res.data.code == 200) {
                            this.$router.push("/specs");
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