import request from '@/utils/request'


//获取SPU列表数据的接口
//url:/admin/product/{page}/{limit}  method:'get'
export const reqSpuList = (page,limit,category3Id) => request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})

//获取spu基本信息
//url:/admin/product/getSpuById/{spuId}  GET 
export const reqSpu = (spuId) => request({url:`/admin/product/getSpuById/${spuId}`,method:'get'})

//获取品牌信息
//url:/admin/product/baseTrademark/getTrademarkList GET
export const reqTradeMarkList = () => request({url:'/admin/product/baseTrademark/getTrademarkList',method:'get'})

//获取SPU图标的接口
//url:/admin/product/spuImageList/{spuId} GET
export const reqSpuImageList = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

//获取平台所有的销售属性（整个平台销售属性一共三个）
//url:/admin/product/baseSaleAttrList GET
export const reqBaseSaleAttrList = () => request({url:'/admin/product/baseSaleAttrList',method:'get'})

//url:/admin/product/saveSpuInfo  /admin/product/updateSpuInfo
export const reqAddOrUpdateSpu = (spuInfo) => {
    //携带参数有id----修改spu
    if(spuInfo.id){
        return request({url:'/admin/product/updateSpuInfo',method:'post',data:spuInfo});
    }else{
        //携带的参数不带id---添加spu
        return request({url:'/admin/product/saveSpuInfo',method:'post',data:spuInfo});
    }
}

//删除spu
//url:/admin/product/deleteSpu/{spuId}  delete
export const reqDeleteSpu = (spuId) => request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'})

//获取sku图片接口
//url:/admin/product/spuImageList/{spuId}  get
//export const reqSpuImageList = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

//获取sku销售属性接口
//url:/admin/product/spuSaleAttrList/{spuId}  get
export const reqSpuSaleAttrList = (spuId) => request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'})

//获取平台属性的数据接口
//url:/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}  get
export const reqAttrInfoList = (category1Id,category2Id,category3Id) => request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

//添加SKU  保存  
//url:/admin/product/saveSkuInfo  post
export const reqAddSku = (skuInfo) => request({url:'/admin/product/saveSkuInfo',method:'post',data:skuInfo})

//获取sku列表数据的接口
//url：/admin/product/findBySpuId/{spuId} get
export const reqSkuList = (spuId) => request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})
