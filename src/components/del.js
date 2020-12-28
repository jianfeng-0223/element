export default {
  function (id, url, obj) {
    this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      axios.post(url, {
        id
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          obj = res.data.list;
        }
      });
    }).catch(() => {
      this.$message({
        type: "info",
        message: "已取消删除",
      });
    });
  },
};
