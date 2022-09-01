<template>
  <!-- 容器 -->
  <div class="charts" ref="charts"></div>
</template>

<script>
//引入echsrts
import * as echarts from 'echarts'
export default {
    name:'barChart',
    mounted() {
        // console.log(echarts);
        //初始化echarts实例
        let barCharts = echarts.init(this.$refs.charts);
        barCharts.setOption({
            xAxis:{
                show:false,
                type:'category'
            },
            yAxis:{
                show:false,
            },
            series:[
                {
                    type:"bar",
                    data:[10,4,35,14,27,15,4,12],
                    color:'pink',
                  
                }
            ],
            grid:{
                left:0,
                top:0,
                right:0,
                bottom:0,
            },
            tooltip:{}
        })
    },
}
</script>

<style>
    .charts{
        width: 100%;
        height: 100%;
    }
</style>