<template>
  <div>
    <!-- 
      按钮 
    -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      @click="showDialog"
      >添加</el-button
    >
    <!-- t
      able表格组件 
    -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" icon="el-icon-edit" size="mini"
            @click="updateTradeMark(row)">修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 
      分页器 
    -->
    <el-pagination
      style="margin-top: 10px; textalign: center"
      background
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout=" prev, pager, next, jumper,->,sizes,total"
    >
    </el-pagination>
    <!-- 
      对话框 
    -->
    <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible" >
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <!-- 上传 -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      //当前页
      page: 1,
      //每页的条数
      limit: 3,
      //总数据
      total: 0,
      //表单数据
      list: [],
      dialogFormVisible: false,
      //收集品牌信息
      tmForm:{
        tmName:'',
        logoUrl:''
      },
      //表单验证规则
      rules:{
        //品牌名称验证规则
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
        ],
        //品牌的logo验证规则
        logoUrl: [
          { required: true, message: '请选择品牌图片' }
        ],
      }
    };
  },
  //组件挂载完毕发请求
  mounted() {
    // console.log(this.$API);
    this.getPageList();
  },
  methods: {
    //获取品牌列表的数据
    async getPageList() {
      //解构参数
      const { page, limit } = this;
      //获取品牌列表的接口
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      // console.log(result);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      } else {
        return error.message;
      }
    },
    handleCurrentChange(pager) {
      this.page = pager;
      this.getPageList();
    },
    //当分页器每页条数变化时触发
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    //点击触发弹框添加表单数据
    showDialog() {
      //展示对话框
      this.dialogFormVisible = true;
      this.tmForm={tmName:'',logoUrl:''}
    },
      //点击修改表单数据
    updateTradeMark(row){
      // console.log(row);
      //展示对话框
      this.dialogFormVisible = true;
      this.tmForm={...row}
    },
    //上传图片成功的回调
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl=res.data;
    },
    //上传图片之前的回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
   addOrUpdateTradeMark(){
    this.$refs.ruleForm.validate(async(success)=>{
      if(success){
        this.dialogFormVisible = false;
        let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
        console.log(result);
        if(result.code==200){
          this.$message({
            type: 'success',
            message:this.tmForm.id?'修改品牌成功':'添加品牌成功'
          });
          this.getPageList(this.tmForm.id?this.page:1);
        }
      }else {
        console.log('error submit!!');
        return false;
      }
    })
    
  },
  //点击删除表单数据
    deleteTradeMark(row){
      this.$confirm(`您确定删除${row.tmName}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        let result = await this.$API.trademark.reqDeleteTradeMark(row.id)
        // console.log(result);
        if(result.code==200){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
        this.page=this.list.length>1?this.page:this.page-1
        this.getPageList(this.page);
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>