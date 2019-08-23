<template>
  <main class="main">
    <div class="singer_con">
       <MBanner/>
    <div class="hot-list">热门歌单推荐</div>
    <div class="recom-list">
      <dl class="list-item" v-for="(item,ind) in recomList" :key="ind" @click="goDetail(item)">
        <dt>
          <img :src="item.imgurl">
        </dt>
        <dd>
          <p class="item-title">{{item.creator.name}}</p>
          <p class="item-des">{{item.dissname }}</p>
        </dd>
      </dl>
    </div>
    </div>

  </main>
</template>
<script>
import MBanner from "../../components/m-banner";
import axios from "axios";
import BScroll from "better-scroll";
export default {
  props: {},
  components: {
    MBanner
  },
  data() {
    return {
      recomList: []
    };
  },
  computed: {},
  methods: {
    scrolls(){
         this.myscroll = new BScroll(".main", {
        probeType: 3,
         click:true
      });
    },
    //跳转列表详情
    goDetail(item) {
      this.$router.push({ path: "/listDteail", query: { disid: item.dissid } });
    }
  },
  created() {
    let url =
      "/api/music/api/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000";
    axios.get(url).then(res => {
      this.recomList = res.data.data.list;
      this.scrolls()
    });
  },
  mounted() {}
};
</script>
<style scoped lang="less">
.hot-list {
  height: 50px;
  color: #ffcd32;
  width: 100%;
  display: flex;
  align-items: center; //垂直居中
  font-size: 14px;
  margin-top: 110px;
  justify-content: center; //居中字体
}
.main{
  height: 100%;
  width: 100%;
  overflow: hidden;;
}
.recom-list {
  width: 100%;
  .list-item {
    width: 90%;
    margin: 5px auto;
    margin-top: 0;
    display: flex;
    align-items: center;
    height: 85px;
    font-size: 18px;

    dt {
      width: 60px;
      height: 60px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    dd {
      flex: 1;
      margin-left: 15px;
      font-size: 14px;
      p {
        height: 30px;
        line-height: 30px;
      }
      .item-title {
        color: #fff;
      }
      .item-des {
        color: hsla(0, 0%, 100%, 0.3);
      }
    }
  }
}
</style>
