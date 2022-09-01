<template>
  <div>
    <div class="card-header">
      <span>{{title}}</span>
      <svg t="1658654421871" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2811" width="12" height="12"><path d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248 512-512 512z m0-938.666667C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667A426.666667 426.666667 0 0 0 512 85.333333z m0 682.666667a42.666667 42.666667 0 0 1-42.368-42.666667v-255.573333a42.368 42.368 0 1 1 84.693333 0V725.333333A42.410667 42.410667 0 0 1 512 768z m0-426.666667a42.325333 42.325333 0 1 1-0.085333-84.650666A42.325333 42.325333 0 0 1 512 341.333333z m42.325333-42.666666v0z" p-id="2812" fill="#cccccc"></path></svg>
    </div>
    <div class="card-content">{{count}}</div>
    <div class="card-charts">
      <slot name="charts"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
    name:'Detail',
    props:['title','count']
}
</script>

<style scoped>
.card-header{
  display: flex;
  justify-content: space-between;
  color:#ccc;
  font-size:14px
}
.card-content{
  font-size: 30px;
  padding: 10px 0;
}
.card-charts{
  height: 50px;
  font-size: 14px;
  /* background-color: pink; */
}
.card-footer{
  padding-top: 10px;
  border-top: 1px #eee solid;
  font-size: 14px;
  color:#666;
}
</style>