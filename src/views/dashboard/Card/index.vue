<template>
  <div> 
   <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <!-- 第一个 -->
          <Detail title="总销售额" count="￥126560">
            <template slot="charts">
              <span>周同比&nbsp;&nbsp;56.67%</span>
              <span>日同比&nbsp;&nbsp;19.67%</span>
            </template>
            <template slot="footer">
              <span>日销售额￥12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <!-- 第二个 -->
          <Detail title="访问量" count="89413">
            <template slot="charts">
              <lineCharts></lineCharts>
            </template>
            <template slot="footer">
              <span>日访问量 124</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <!-- 第三个 -->
          <Detail title="支付笔数" count="12412">
            <template slot="charts">
              <barCharts></barCharts>
            </template>
            <template slot="footer">
              <span>日销售额￥12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <!-- 第四个 -->
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <progressCharts></progressCharts>
            </template>
            <template slot="footer">
              <span>日销售额￥12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import lineCharts from './lineChart'
import barCharts from './barChart'
import progressCharts from './progressChart'
export default {
    name:'Card',
    components:{
      Detail,
      lineCharts,
      barCharts,
      progressCharts,
    }
}
</script>

<style>

</style>