<template>
  <el-card>
    <div slot="header" class="header">
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="value" size="mini">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div>
      <div class="charts" ref="charts"></div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts"
export default {
    name:'Category',
    data(){
      return{
        value:'全部渠道',
      }
    },
    mounted() {
      //初始化echarts
      let pieCharts = echarts.init(this.$refs.charts)
      pieCharts.setOption({
        title:{
          text:'',
          subtext:'',
          left:"center",
          top:"center",
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              position: 'outside'
            },
            labelLine: {
              show: true,
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      })
      pieCharts.on('mouseover',(params)=>{
        console.log(params);
        //鼠标移上获取数据
        const {name,value} = params.data
        // title.text=params.name
        // title.subtext=params.value
        pieCharts.setOption({
          title:{
            text:name,
            subtext:value
          }
        })
      })
    },
}
</script>

<style scoped>
  .category-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header{
    border-bottom: 1px #eee solid;
    padding-bottom: 10px;
  }
  .charts{
    width: 100%;
    height: 300px;
  }
  >>>.el-card__body {
    padding-top: 0;
  }
</style>