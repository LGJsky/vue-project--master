<template>
  <el-card class="box-card" style="margin: 10px 0">
    <div slot="header" class="clearfix">
      <!-- 头部左侧内容 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>
      </el-tabs>
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
          v-model="date"
          class="date"
          size="mini"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <!-- 容器-柱状图 -->
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="6" class="right">
            <h3>门店{{title}}排名</h3>
            <ul>
                <li>
                    <span class="rindex">1</span>
                    <span>肯德基</span>
                    <span class="rvalue">323341</span>
                </li>
                <li>
                    <span class="rindex">2</span>
                    <span>肯德基</span>
                    <span class="rvalue">323341</span>
                </li>
                <li>
                    <span class="rindex">3</span>
                    <span>肯德基</span>
                    <span class="rvalue">323341</span>
                </li>
                <li>
                    <span class="rindex rnone">4</span>
                    <span>肯德基</span>
                    <span class="rvalue">323341</span>
                </li>
                <li>
                    <span class="rindex rnone">5</span>
                    <span>肯德基</span>
                    <span class="rvalue">323341</span>
                </li>
                <li>
                    <span class="rindex rnone">6</span>
                    <span>肯德基</span>
                    <span class="rvalue">323341</span>
                </li>
                <li>
                    <span class="rindex rnone">7</span>
                    <span>肯德基</span>
                    <span class="rvalue">323341</span>
                </li>
            </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
import *  as dayjs from 'dayjs'
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
      saleCharts:null,
      date:[],//收集日历数据
    };
  },
  mounted() {
    //初始化echarts实例
    this.saleCharts = echarts.init(this.$refs.charts);
    this.saleCharts.setOption({
        title:{
            text:"销售额趋势",
        },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390,123,141,233,90,233, 330,220],
        },
      ],
    });
  },
  computed:{
    title(){
        return this.activeName=='sale'?'销售额':'访问量';
    }
  },
  watch:{
    title(){
        //重新修改图表配置数据
        this.saleCharts.setOption({
            title:{
                text:this.title+'趋势'
            }
        })
    }
  },
  methods: {
    //本天
    setDay(){
      const day = dayjs().format('YYYY-MM-DD')
      this.date=[day,day]
    },
    //本周
    setWeek(){
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      this.date=[start,end]
    },
    setMonth(){
      const start = dayjs().startOf('month').format('YYYY-MM-DD');
      const end = dayjs().endOf('month').format('YYYY-MM-DD');
      this.date=[start,end]
    },
    setYear(){
      const start = dayjs().startOf('year').format('YYYY-MM-DD');
      const end = dayjs().endOf('year').format('YYYY-MM-DD');
      this.date=[start,end]
    }
  },
};
</script>

<style scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.date {
  width: 250px;
  margin: 0 20px;
}
.right span {
  margin: 0 10px;
  /* font-size: 12px; */
}
.charts {
  width: 100%;
  height: 300px;
}
ul{
    list-style: none;
    padding: 0;
    width: 100%;
    height: 300px;
}
ul li{
    height: 8%;
    margin: 10px 0;
}
.rindex{
    float: left;
    width:20px;
    height: 20px;
    border-radius: 50%;
    background-color: pink;
    color: #fff;
    line-height: 20px;
    text-align: center;
}
.rvalue{
    float: right;
}
.rnone{
    background-color: #fff;
    color:#000;
}
</style>