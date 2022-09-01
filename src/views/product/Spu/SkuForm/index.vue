<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        {{spu.spuName}}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.spuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" :rows="4" placeholder="规格描述" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName"  v-for="attr in attrInfoList" :key="attr.id" style="margin-bottom:5px">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="attrValue in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="saleAttrValue in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

       <el-form-item label="图片列表">
        <el-table :data="spuImageList" style="width: 100%" border @selection-change="handleSelectionChange">
          <el-table-column type="selection" prop="prop" width="60">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row,$index}">
              <img :src="row.imgUrl" alt="" style="width:100px;height:100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" size="mini" v-if="row.isDefault==0" @click="changeDefault(row)">设为默认</el-button>
              <el-button type="success" size="mini" plain disabled v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>    
       </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
       </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name:'SkuForm',
    data(){
      return{
        //储存图片数据
        spuImageList:[],
        //储存销售属性
        spuSaleAttrList:[],
        //储存平台属性
        attrInfoList:[],
        //储存spu属性数据
        skuInfo:{
          //第一类收集父组件给的数据
          category3Id: 0,
          spuId: 0,
          tmId: 0,
          //第二类需通过双向绑定v-model收集
          price: 0,
          skuName: "",
          weight: "",
          skuDesc: "",
          //第三类需自己书写代码
          //默认图片
          skuDefaultImg: "",
          //收集图片
          skuImageList: [
            // {
            //   id: 0,
            //   imgName: "string",
            //   imgUrl: "string",
            //   isDefault: "string",
            //   skuId: 0,
            //   spuImgId: 0
            // }
          ],
          //平台属性
          skuAttrValueList: [
            // {
            //   attrId: 0,
            //   attrName: "string",
            //   valueId: 0,
            //   valueName: "string"
            // }
          ],
          //销售属性
          skuSaleAttrValueList: [
            // {
            //   id: 0,
            //   saleAttrId: 0,
            //   saleAttrName: "string",
            //   saleAttrValueId: 0,
            //   saleAttrValueName: "string",
            //   skuId: 0,
            //   spuId: 0
            // }
          ]
        },
        spu:{},
        //收集图片的数据字段
        imageList:[]
      }
    },
    methods: {
      //发请求获取SkuForm数据
      async getData(category1Id,category2Id,spu){
        //获取父组件spu属性数据
        this.skuInfo.category3Id=spu.category3Id
        this.skuInfo.spuId=spu.id
        this.skuInfo.tmId=spu.tmId
        this.spu=spu
        //获取图片数据
        let result = await this.$API.spu.reqSpuImageList(spu.id);
        // console.log(result);
        if(result.code==200){
          let list = result.data;
          list.forEach(item => {
            item.isDefault=0;
          });
          this.spuImageList=list;
        }
        let result1 = await this.$API.spu.reqSpuSaleAttrList(spu.id);
        // console.log(result1);
        if(result1.code==200){
          this.spuSaleAttrList=result1.data;
        }
        let result2 = await this.$API.spu.reqAttrInfoList(category1Id,category2Id,spu.category3Id);
        // console.log(result2);
        if(result2.code==200){
          this.attrInfoList=result2.data;
        }
      },
      //是teble表格复选框事件
      handleSelectionChange(params){
        console.log(params);
        //获取到用户选中图片的信息数据
        this.imageList=params
      },
      //排他
      changeDefault(row){
        //图片列表的数据isDefault为0
        this.spuImageList.forEach(item => {
          item.isDefault=0;
        })
        // console.log(row);
        //点击的isDefault字段为1
        row.isDefault=1;
        //收集默认图片
        this.skuInfo.skuDefaultImg=row.imgUrl;
      },
      //取消按钮
      cancel(){
        //自定义事件，让父组件切换场景0
        this.$emit('changeScenes',0)
        //清除数据
        Object.assign(this._data,this.$options.data());
      },
      //保存按钮
      async save(){
        //整理参数
        //整理平台属性
        const {attrInfoList,skuInfo,spuSaleAttrList,imageList} = this;
        //整理平台属性的数据方式1
        //创建数组
        // let arr=[];
        // attrInfoList.forEach(item => {
        //   if(item.attrIdAndValueId){
        //     const [attrId,valueId] = item.attrIdAndValueId.split(":");
        //     let obj = {valueId,attrId};
        //     arr.push(obj)
        //   }
        // })
        // shuInfo.skuAttrValueList=arr;
        //平台属性方法2
        skuInfo.skuAttrValueList = attrInfoList.reduce((prev,item) => {
          if(item.attrIdAndValueId){
            const [attrId,valueId] = item.attrIdAndValueId.split(":");
            prev.push({attrId,valueId});
          }
          return prev;
        },[]);
        //销售属性
        skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev,item) => {
          if(item.attrIdAndValueId){
            const [saleAttrId,saleAttrValueId] = item.attrIdAndValueId.split(":");
            prev.push({saleAttrId,saleAttrValueId})
          }
          return prev;
        },[])
        //整理图片数据
        skuInfo.skuImageList = imageList.map(item=>{
          return{
            imgName:item.imgName,
            imgUrl:item.imgUrl,
            isDefault:item.isDefault,
            spuImgId: item.id,
          }
        })
        //发请求
        let result = await this.$API.spu.reqAddSku(skuInfo);
        // console.log(result);
        if(result.code==200){
          this.$message({type:'success',message:'添加SKU成功'})
          this.$emit('changeScenes',0)
        }
      }
    },
}
</script>

<style>
</style>