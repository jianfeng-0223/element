<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item></el-breadcrumb
    >
    <el-button type="primary" size="medium" @click="add" class="addbutton"
      >添加</el-button
    >
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      border
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号"> </el-table-column>
      <el-table-column prop="title" label="菜单名称"> </el-table-column>
      <el-table-column label="菜单类型">
        <template slot-scope="item">
          <el-tag type="primary" v-if="item.row.type == 1">目录</el-tag>
          <el-tag type="danger" v-else>菜单</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="item">
          <i v-if="item.row.icon" :class="item.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <el-tag type="success" size="small" v-if="item.row.status == 1"
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
            @click="$router.push('/menu/' + item.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="del(item.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
// import { mapState } from "vuex";
export default {
  methods: {
    add() {
      this.$router.push("menu/add");
    },
    del(id) {
      //   this.tableData.splice(v, 1);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios.post("/api/menudelete", { id }).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.tableData = res.data.list;
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
      tableData: [],
    };
  },
  // computed: {
  //   ...mapState(["tableData"]),
  // },
  mounted() {
    axios.get("/api/menulist?istree=1").then((res) => {
      this.tableData = res.data.list;
    });
  },
};
</script>

<style>
.addbutton {
  margin-bottom: 10px;
}
</style>