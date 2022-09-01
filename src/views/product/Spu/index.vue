<template>
  <div>
    <el-card style="margin: 20px 0">
      <!-- 三级联动 -->
      <CategorySelect @getCategoryId="getCategoryId" :show="scene!=0"></CategorySelect>
    </el-card>
    
    <el-card>
        <!-- SPU列表结构展示 -->
      <div v-show="scene==0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width"> </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width"> </el-table-column>
          <el-table-column prop="prop" label="spu操作" width="width">
            <template slot-scope="{row,index}"> 
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加sku" @click="addSku(row)"></hint-button>
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="updateSpu(row)"></hint-button>
              <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表" @click="handler(row)"></hint-button>
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu" slot="reference"></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange" -->
        <el-pagination
        style="text-align:center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->, sizes,total"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange" >
        </el-pagination>
      </div>
      <SpuForm v-show="scene==1" @changeScene="changeScene" ref="spu"></SpuForm>
      <SkuForm v-show="scene==2" @changeScenes="changeScenes" ref="sku"></SkuForm>
    </el-card>
    <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close="close">
      <!-- table展示sku列表 -->
      <el-table :data="skuList" style="width: 100%" border v-loading="loading">
        <el-table-column prop="skuName" width="width" label="名称">
        </el-table-column>
        <el-table-column prop="price" width="width" label="价格">
        </el-table-column>
        <el-table-column prop="weight" width="width" label="重量">
        </el-table-column>
        <el-table-column prop="prop" width="width" label="默认图片">
          <template slot-scope="{row,$index}">
            <img :src="row.skuDefaultImg" alt="" style="height:100px;width:100px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  name: "Spu",
  components:{
    SpuForm,
    SkuForm
  },
  data(){
    return{
      category1Id:'',
      category2Id:'',
      category3Id:'',
      show:true,
      page:1,
      limit:3,
      records:[],
      total:0,
      scene:0,
      dialogTableVisible:false,
      spu:{},
      skuList:[],//储存sku列表数据
      loading:true,
      
    }
  },
  methods: {
    //点击分页器的第几页按钮的回调
    handleCurrentChange(page){
      // console.log(page);
      this.page=page,
      this.getSpuList(page);
    },
    //三级联动的自定义事件，可以把子组件相应的id给父组件
    getCategoryId({categoryId,level}){
      //categoryId:获取一、二、三级分类Id
      if(level==1){
        this.category1Id=categoryId;
        //清除2，3级Id
        this.category2Id='';
        this.category3Id='';
      }else if(level==2){
        this.category2Id=categoryId
        //清除3级Id
        this.category3Id='';
      }else{
        this.category3Id=categoryId;
        this.getSpuList();
      }
    },
    async getSpuList(pages=1){
      this.page=pages;
      const {page,limit,category3Id} = this;
      let result = await this.$API.spu.reqSpuList(page,limit,category3Id)
      // console.log(result);
      if(result.code==200){
        this.records=result.data.records;
        this.total=result.data.total;
      }
    },
    //分页每页展示数据条数发生变化的回调
    handleSizeChange(limit){
      this.limit=limit;
      this.getSpuList();
    },
    //添加Spu
    addSpu(){
      this.scene=1;
      this.$refs.spu.addSpuData(this.category3Id);
    },
    //修改某一个spu
    updateSpu(row){
      this.scene=1;
      this.$refs.spu.initSpuData(row)
    },
    //添加spu取消返回：自定义事件
    changeScene({scene,flag}){
      this.scene=scene;
      // console.log(flag);
      //子组件通知父组件
      if(flag=="修改"){
        this.getSpuList(this.page);
      }else {
        this.getSpuList();
      }
    },
    //删除spu
    async deleteSpu(row){
      // console.log(row);
      let result = await this.$API.spu.reqDeleteSpu(row.id);
        // console.log(result);
        if(result.code==200){
          this.$message({type:'success',message:"删除成功"});
          //当前页条数大于1停留在当前页，否则-1
          this.getSpuList(this.records.length>1?this.page:this.page-1)
        }
    },
    //添加Sku回调
    addSku(row){
      //切换场景为2
      this.scene=2;
      //父组件调用子组件的方法，让子组件发请求---三个请求
      this.$refs.sku.getData(this.category1Id,this.category2Id,row);
    },
    changeScenes(scene){
      this.scene=scene;
    },
    async handler(spu){
      this.dialogTableVisible=true;
      console.log(spu);
      this.spu=spu;
      //发请求获取sku列表进行展示
      let result = await this.$API.spu.reqSkuList(spu.id);
      console.log(result);
      if(result.code==200){
        this.skuList=result.data;
        //设置loading为false
        this.loading=false;
      }
    },
    //关闭对话框的回调
    close(done){
      //loading属性为true
      this.loading=true;
      //清除sku列表数据
      this.skuList=[];
      //关闭对话框
      done()
    }
  },
};
</script>

<style>
</style>