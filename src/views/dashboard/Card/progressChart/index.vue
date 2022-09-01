<template>
  <!-- 容器 -->
  <div class="charts" ref="charts"></div>
</template>

<script>
//引入echsrts
import * as echarts from 'echarts'
export default {
    name:'progressCharts',
    mounted() {
        // console.log(echarts);
        //初始化echarts实例
        let progressCharts = echarts.init(this.$refs.charts);
        progressCharts.setOption({
            xAxis:{
                show:false,
                min:0,
                max:100,
            },
            yAxis:{
                show:false,
                type:'category'
            },
            series:[
                {
                    type:"bar",
                    data:[78],
                    color:'pink',
                    barWidth:10,
                    showBackground:true,
                    backgroundStyle:{
                        color:'#eee'
                    },
                    label:{
                        show:true,
                        formatter:'|',
                        position:'right',
                        color:'pink'
                    }
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