<template>
  <div class="container">
    <div class="header_top">
      <span @click="goback()">&lt;</span>
      <p>{{listTitle}}</p>
    </div>
    <main class="main" v-if="detaillist">
      <div class="banlog">
        <img :src="url">
      </div>
      <div class="detail_item_list">
        <div class="item_list_con" v-for="(item,ind) in detaillist.songlist" :key="ind">
           <dt>
             <!-- 前三个是图片 -->
              <template  v-if="ind<3" >
                <img :src="require('../../assets/'+imgs[ind])"/>
              </template>
              {{ind+1>3?ind+1:''}}
           </dt>
           <dd>
               <p class="title">{{item.data.songname}}</p>
               <p class="des">{{item.data.singer[0].name+'/'+item.data.songorig+'-'+item.data.songname}}</p>
           </dd>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import jsonp from "jsonp";
export default {
  props: {},
  components: {},
  data() {
    return {
      listTitle: "",//标题
      url:"",//log图
      imgs:["rank_one.png","rank_two.png","rank_three.png"],//奖杯
      detaillist: {}
    };
  },
  computed: {},
  methods: {
    //返回上一页
    goback() {
      this.$router.go(-1);
    }
  },
  created() {
    let { id } = this.$route.query; //获取路由传的参数id
    let url = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&topid=${id}&needNewCode=1&uin=0&tpl=3&page=detail&type=top&platform=h5`;
    jsonp(url,{param:'jsonpCallback'},(err,res)=>{
      this.listTitle=res.topinfo.ListName;
      this.url=res.topinfo.pic_album
      this.detaillist=res;
    })
  }
};
</script>
<style scoped lang="less">
@import "../../style/rankDetail.less";
</style>
