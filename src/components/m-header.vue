<template>
  <div class="m-header">
   <div><img :src="require('../assets/log.png')"/><span>Chicken Music</span> <i class="iconfont icon-wode"></i></div>
  </div>
</template>

<script>
export default {

}
</script>

<style  lang="less">
@import '../style/index.less';
.m-header{
  .w(375);
  .h(44);
  color:@fc-yellow;
  font-size: @fs-l;
  text-align: center;
  div{
      display: flex;
      align-items: center;
      height: 100%;;
      justify-content: center;
        span{
          padding-top: 8px;
        }
        .icon-wode{
          position: absolute;
          right: 20px;;
          top: 10px;
          font-size: 25px;
        }
  }
  img{
    width: 34px;
    height: 34px;;
    margin-right: 5px;
  }
}

</style>
