<template>
  <div class="m-header">
    <div class="swiper-container">
      <div class="swiper-wrapper">
          <div class="swiper-slide"
              v-for='(item,index) in lists'
              :key='index'
          >
          <img :src="item.picUrl" alt="">
          </div>

      </div>
   </div>
  </div>
</template>

<script>
import Swiper from  'swiper'
import  jsonp from  'jsonp'
export default {
  data(){
    return{
      lists:[]
    }
  },
  methods:{
    initBanner(){
      new Swiper('.swiper-container',{
        autoplay:true
      })
    }
  },
  created(){

    let url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&platform=h5&uin=0&needNewCode=1'
    jsonp(url,{param:'jsonpCallback'},(err,res)=>{
      this.lists=res.data.slider
      this.$nextTick(()=>{
         this.initBanner()
      })
    })
  },
  mounted(){

  }
}
</script>

<style scoped lang="less">
@import '../../node_modules/swiper/dist/css/swiper.min.css';
@import '../style/index.less';
.swiper-container{
  .w(375);
  .h(150);
  img{
    .w(375);
    .h(150);
  }
}
</style>
