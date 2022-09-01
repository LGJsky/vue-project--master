<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option :label="tm.tmName" :value="tm.id" v-for="(tm,index) in tradeMarkList" :key="tm.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" placeholder="SPU描述" v-model="spu.description"></el-input>
      </el-form-item>
      <el-form-item label="上传">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handlerSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrIdAndAttrName">
          <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="unselect in unSelectSaleAttr" :key="unselect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
        <el-table-column type="index" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column prop="saleAttrName" label="属性名" width="150">
        </el-table-column>
        <el-table-column prop="prop" label="属性值名称列表" width="width">
          <template slot-scope="{row,$index}">
            <el-tag
              :key="tag.id"
              v-for="(tag,index) in row.spuSaleAttrValueList"
              closable
              :disable-transitions="false"
              @close="row.spuSaleAttrValueList.splice(index,1)">
              {{tag.saleAttrValueName}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="row.inputVisible"
              v-model="row.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(row)"
              @blur="handleInputConfirm(row)"
            >
            </el-input> 
           <!--  @click="showInput"  -->
            <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>

          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="150">
          <template slot-scope="{row,$index}">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
          </template>
        </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name:'SpuForm',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        //存储SPU信息属性
        spu:{
          //三级分类的id
          category3Id: 0,
          //品牌Id
          tmId: "",
          //描述
          description: "",
          //spu名称
          spuName: "",
          //收集spu图片信息
          spuImageList: [
            {
              id: 0,
              imgName: "",
              imgUrl: "",
              spuId: 0
            }
          ],
          //平台属性与属性值收集
          spuSaleAttrList: []
        },
        tradeMarkList:[],//存储品牌信息
        spuImageList:[],//存储SPU图标的接口
        saleAttrList:[],//存储平台销售属性的数据
        attrIdAndAttrName:'',//收集未选择的销售属性Id
      };
    },
    methods: {
      //照片墙图片删除的回调
      handleRemove(file, fileList) {
        // console.log(file, fileList);
        this.spuImageList=fileList
      },
      //照片墙图片预览的回调
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        //对话框显示
        this.dialogVisible = true;
      },
      //初始化SpuForm数据
      async initSpuData(spu){
        //获取spu信息的数据
        let spuResult = await this.$API.spu.reqSpu(spu.id);
        if(spuResult.code==200){
          this.spu=spuResult.data
        }
        //获取品牌信息的数据
        let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
        // console.log(tradeMarkResult);
        if(tradeMarkResult.code==200){
          this.tradeMarkList=tradeMarkResult.data;
        }
        //获取SPU图标的数据
        let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id)
        // console.log(spuImageResult);
        if(spuImageResult.code==200){
          let listArr=spuImageResult.data;
          listArr.forEach(item => {
            item.name=item.imgName;
            item.url=item.imgUrl;
          });
          this.spuImageList=listArr
        }
        //获取平台所有的销售属性的数据
        let saleResult = await this.$API.spu.reqBaseSaleAttrList()
        // console.log(attrResult);
        if(saleResult.code==200){
          this.saleAttrList=saleResult.data;
        }
      },
      //照片墙图片上传成功的回调
      handlerSuccess(response, file, fileList){
        // console.log(response, file, fileList);
        //收集图片信息
        this.spuImageList = fileList;

      },
      //添加新的销售属性
      addSaleAttr(){
        //把收集到的销售属性数据进行分割
        const [baseSaleAttrId,saleAttrName] = this.attrIdAndAttrName.split(':');
        //向SPU对象的spuSaleAttrList属性里面添加新的销售属性
        let newSaleAttr = {baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]};
        //添加新的销售属性
        this.spu.spuSaleAttrList.push(newSaleAttr);
        //清空数据
        this.attrIdAndAttrName='';
      },
      //添加按钮的回调
      addSaleAttrValue(row){
          this.$set(row,'inputVisible',true)
          this.$set(row,'inputValue','');
      },
      //el-input失去焦点的事件
      handleInputConfirm(row){
        // console.log(row);
        const {baseSaleAttrId,inputValue} = row;
        //新增属性名不能为空
        if(inputValue.trim()==''){
          this.$message('内容不能为空');
          return;
        }
        //属性名称不能重复
        let result=row.spuSaleAttrValueList.every(item => item.saleAttrValueName!=inputValue)
        // console.log(result);
        if(!result)return;
        let newSaleAttValue = {baseSaleAttrId,saleAttrValueName:inputValue};
        row.spuSaleAttrValueList.push(newSaleAttValue);
        //修改inputVisible为false，变回button
        row.inputVisible=false;
      },
      //保存按钮的回调
      async addOrUpdateSpu(){
        //整理参数：整理照片墙的数据
        this.spu.spuImageList=this.spuImageList.map(item =>{
          return {
            imgName:item.name,
            imgUrl:(item.response && item.response.data) || item.url,
          };
        })
        //发请求
        let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
        console.log(result);
        if(result.code==200){
          //提示
          this.$message({type:'success',message:'保存成功'})
          //通知父组件回到0
          this.$emit('changeScene',{scene:0,flag:this.spu.id?'修改':'添加'})
        }
        //清除数据
        Object.assign(this._data,this.$options.data());
      },
      //点击添加SPU按钮时发请求
      async addSpuData(id){
        //获取3Id
        this.spu.category3Id=id;
        //获取品牌信息的数据
        let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
        // console.log(tradeMarkResult);
        if(tradeMarkResult.code==200){
          this.tradeMarkList=tradeMarkResult.data;
        }
        //获取平台所有的销售属性的数据
        let saleResult = await this.$API.spu.reqBaseSaleAttrList()
        // console.log(saleResult);
        if(saleResult.code==200){
          this.saleAttrList=saleResult.data;
        }
      },
      //点击取消
      cancel(){
        this.$emit('changeScene',{scene:0,flag:''});
        //清除数据
        Object.assign(this._data,this.$options.data());
      }
    },
    computed:{
      unSelectSaleAttr(){
        let result = this.saleAttrList.filter(item => {
          return this.spu.spuSaleAttrList.every(item1 => {
            return item.name !== item1.saleAttrName
          })
        })
        return result;

      }
    }
}
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>