<template>
  <!-- 容器 -->
  <div class="charts" ref="charts"></div>
</template>

<script>
//引入echsrts
import * as echarts from 'echarts'
export default {
    name:'lineChart',
    mounted() {
        // console.log(echarts);
        //初始化echarts实例
        let lineCharts = echarts.init(this.$refs.charts);
        lineCharts.setOption({
            xAxis:{
                show:false,
                type:'category'
            },
            yAxis:{
                show:false,
            },
            series:[
                {
                    type:"line",
                    data:[10,4,35,14,27,15,4,12],
                    //拐点透明度
                    itemStyle:{
                        opacity:0
                    },
                    //线条的样式
                    lineStyle:{
                        color:'purple',
                    },
                    areaStyle:{
                        color:{
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'purple' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#fff' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                            }
                    },
                    //曲线
                    smooth:true,
                }
            ],
            grid:{
                left:0,
                top:0,
                right:0,
                bottom:0,
            }
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