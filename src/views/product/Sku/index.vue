<template>
  <div>
    <el-card>
      <!-- 表格tadle -->
      <el-table :data="records" style="width: 100%" border>
        <el-table-column type="index"  label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column prop="skuName"  label="名称" width="width">
        </el-table-column>
        <el-table-column prop="skuDesc"  label="描述" width="width">
        </el-table-column>
        <el-table-column prop="prop"  label="默认图片" width="120">
          <template slot-scope="{row,$index}">
            <img :src="row.skuDefaultImg" alt="" style="height:100px;width:100px">
          </template>
        </el-table-column>
        <el-table-column prop="weight"  label="重量(KG)" width="width">
        </el-table-column>
        <el-table-column prop="price"  label="价格(元)" width="60">
        </el-table-column>
        <el-table-column prop="prop"  label="操作" width="width">
          <template slot-scope="{row,$index}">
            <el-button type="info" icon="el-icon-bottom" size="mini" v-if="row.isSale==1" @click="cancelSale(row)"></el-button>
            <el-button type="success" icon="el-icon-top" size="mini" v-else @click="sale(row)"></el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit"></el-button>
            <el-button type="info" icon="el-icon-info" size="mini" @click="getSkuInfo(row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="getSkuList"
        style="text-align:center"
        :current-page="page"
        :page-sizes="[3, 5, 10]"
        :page-size="limit"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        >
      </el-pagination>
      <!-- 抽屉效果 -->
      <el-drawer :visible.sync="show" :show-close="false" size="50%">
        <el-row>
          <el-col :span="5">名称</el-col>
          <el-col :span="16">{{skuInfo.skuName}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">描述</el-col>
          <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">价格</el-col>
          <el-col :span="16">{{skuInfo.price}}元</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">平台属性</el-col>
          <el-col :span="16">
            <template>
              <el-tag type="success" v-for="attr in skuInfo.skuAttrValueList" :key="attr.id" style="margin:0 5px 5px 0">{{attr.attrId}}-{{attr.valueId}}</el-tag>
            </template>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">商品图片</el-col>
          <el-col :span="16">
            <el-carousel height="height">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" alt="" style="height:100%;width:100%">
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </el-drawer>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'Sku',
  data(){
    return{
      page:1,//当前页
      limit:10,//页面展示条数
      total:0,//数据总条数
      records:[],//储存SKU列表的数据
      skuInfo:{},//储存sku信息
      show:false,//抽屉效果显示与隐藏
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    //获取sku列表的方法
    async getSkuList(pages = 1){
      this.page = pages;
      //结构参数
      const {page,limit} = this
      let result = await this.$API.sku.reqSkuList(page,limit)
      // console.log(result);
      if(result.code==200){
        this.total = result.data.total
        this.records = result.data.records;
      }
    },
    handleSizeChange(limit){
      //修改参数
      this.limit=limit;
      this.getSkuList();
    },
    //上架
    async sale(row){
    let result = await this.$API.sku.reqSale(row.id)
    if(result.code==200){
      row.isSale = 1;
      this.$message({type:'success',message:'上架成功'});
    }
    },
    //下架
    async cancelSale(row){
      let cancelResult = await this.$API.sku.reqCancelSale(row.id);
      if(cancelResult.code==200){
        row.isSale = 0;
        this.$message({type:'success',message:'已下架'})
      }
    },
    edit(){
      this.$message('正在开发中')
    },
    //获取SKU详情
    async getSkuInfo(sku){
      this.show=true;
      let result = await this.$API.sku.reqGetSkuById(sku.id);
      // console.log(result);
      if(result.code==200){
        this.skuInfo=result.data;
      }
    }
  },
}
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  


</style>
<style scoped>
  .el-row .el-col-5{
    font-size: 18px;
    text-align: right;
    
  }
  .el-col{
    margin: 10px 10px;
  }
  >>>.el-carousel__button{
    width: 10px;
    height: 10px;
    background-color: pink;
    border-radius: 50%;  
  }
</style>