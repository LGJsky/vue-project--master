//这个模块主要获取的是品牌管理的数据的模块
import request from '@/utils/request'
//获取品牌列表接口
///admin/product/baseTrademark/{page}/{limit}  method：'get'
export const reqTradeMarkList = (page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'})

//添加品牌接口
//url:/admin/product/baseTrademark/save  method:'post' 
// export const reqTradeMrakSave=(logoUrl,tmName)=>request({url:`/admin/product/baseTrademark/save/${logoUrl}/${tmName}`,method:'post'})

//修改品牌接口
//url:/admin/product/baseTrademark/update  method:'put'
// export const reqTradeMarkUpdate=(id,logoUrl,tmName)=>request({url:'/admin/product/baseTrademark/update',method:'put'})
export const reqAddOrUpdateTradeMark = (tradeMark)=>{
    //带给服务器有ID---修改
    if(tradeMark.id){
        return request({url:'/admin/product/baseTrademark/update',method:'put',data:tradeMark})
    }else{
        //新增品牌
        return request({url:'/admin/product/baseTrademark/save',method:'post',data:tradeMark})
    }
}

//删除品牌接口
//url:/admin/product/baseTrademark/remove/{id}  method:delete
export const reqDeleteTradeMark = (id) => request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})


