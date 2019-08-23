<template>
  <div class="container">
    <div class="header_top">
      <span @click="goback()">&lt;</span>
      <p>{{listTitle}}</p>
    </div>
    <main class="main">
      <div class="banlog">
        <img :src="detaillist.logo">
      </div>
      <div class="detail_item_list">
        <div class="item_list_con" v-for="(item,ind) in detaillist.songlist" :key="ind">
          <p class="title">{{item.songname}}</p>
          <p class="des">{{item.singer[0].name+'-'+item.songorig}}</p>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {},
  components: {},
  data() {
    return {
      listTitle: "",
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
    let { disid } = this.$route.query; //获取路由传的参数id
    let url = `/api/music/api/getCdInfo?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&disstid=${disid}&type=1&json=1&utf8=1&onlysong=0&platform=yqq&hostUin=0&needNewCode=0`;
    axios.get(url).then(res => {
      console.log(res.data.cdlist[0]);
      this.detaillist = res.data.cdlist[0];
      this.listTitle = res.data.cdlist[0].dissname;
    });
  }
};
</script>
<style scoped lang="less">
html {
  width: 100%;
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.header_top {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 14px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  z-index: 10;
  font-size: 18px;
  span {
    width: 20%;
    display: flex;
    justify-content: center;
    color: #ffcd32;
    font-size: 28px;
  }
  p {
    display: flex;
    // flex: 1;
    width: 180px;
    padding-left: 5%;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.main {
  background: #222;
  width: 100%;
  height: 100%;
  overflow: auto;
  .detail_item_list {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .item_list_con {
      width: 85%;
      margin: 0 auto;
      margin: 10px;
      p {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        width: 280px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .title {
        color: #fff;
      }
      .des {
        color: rgba(255, 255, 255, 0.432);
      }
    }
  }
}
.banlog {
  width: 100%;
  height: 270px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
