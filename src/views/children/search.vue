<template>
  <main class="main">
    <p class="serach_text">
      <i class="iconfont icon-fangdajing"></i>
      <input type="text" @input="serachFn()" v-model="val" placeholder="搜索歌曲、歌手">
    </p>
    <div class="hot_con" v-if="serachlist.length==0">
      <h2>热门搜索</h2>
      <ul>
        <li v-for="(item,ind) in hotlist" :key="ind">{{item.k}}</li>
      </ul>
    </div>
    <div class="ser_con" v-else ref="bigbox">
      <div class="serach_con_list">
        <ul class="uls" style="padding-bottom: -40px;" ref="childP">
          <li v-for="(item,ind) in serachlist" :key="ind">
            <img :src="require('../../assets/ser.png')">
            <span class="title">{{item.songname}}</span>
          </li>
          <img v-if="flag" class="loading" :src="require('../../assets/loading.gif')">
        </ul>
      </div>
    </div>
  </main>
</template>
<script>
import jsonp from "jsonp";
import axios from "axios";
import BScroll from "better-scroll";
import { setTimeout } from "timers";
export default {
  props: {},
  components: {},
  data() {
    return {
      hotlist: [], //热门数据
      serachlist: [], //搜索到的数据
      val: "",
      flag: false,
      pages: 1 //页数
    };
  },
  computed: {},
  methods: {
    //上拉加载
    scrolls() {
      this.myscroll = new BScroll(".ser_con", {
        probeType: 2,
        click: true
      });
      //父级盒子
      // p=2&perpage=20//页数条数

      this.myscroll.on("touchEnd", e => {
        let { height: pHeight } = this.$refs.bigbox.getBoundingClientRect();//可视区高度
        let { height: cHeight } = this.$refs.childP.getBoundingClientRect();//内容高度
        if (Math.abs(e.y) + pHeight >= cHeight) {
            this.pages++;
            this.flag = true;
            this.geturl();
        }
      });
    },
    //模糊搜索
    serachFn() {
      if (this.val !== "") {
        this.geturl();
      }
    },
    geturl() {
      let url = `/api/music/api/search?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&w=${
        this.val
      }&p=${
        this.pages
      }&perpage=40&n=20&catZhida=1&zhidaqu=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.all&uin=0&needNewCode=1&platform=h5`;
      axios.get(url).then(res => {
        this.serachlist = this.serachlist.concat(res.data.data.song.list);
        if (this.serachlist.length) {
          console.log(this.serachlist.length)
          this.$nextTick(() => {
            this.scrolls();
            this.flag = false;
          });
        }
      });
    }
  },
  created() {
    //
    let url =
      "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5";
    jsonp(url, { param: "jsonpCallback" }, (err, res) => {
      //查找前10名,进行倒序排序
      this.hotlist = res.data.hotkey.sort((x, y) => y - x).slice(0, 10);
    });
  },
  mounted() {}
};
</script>
<style scoped lang="less">
.main {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.serach_con_list {
  width: 100%;
}
.serach_text {
  width: 90%;
  height: 40px;
  margin: 15px auto;
  border-radius: 5px;
  line-height: 18px;
  background: #333;
  color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  i {
    font-size: 20px;
    color: #222;
  }
  input {
    margin-left: 5px;
    line-height: 18px;
    background: #333;
    color: #fff;
    font-size: 14px;
    outline: 0;
  }
}
.hot_con {
  width: 90%;
  margin: 0 auto;
  margin-top: 25px;
  h2 {
    margin-bottom: 20px;
    font-size: 14px;
    color: hsla(0, 0%, 100%, 0.5);
  }
  ul {
    width: 100%;
    li {
      display: inline-block;
      padding: 5px 10px;
      margin: 0 20px 10px 0;
      border-radius: 6px;
      background: #333;
      font-size: 14px;
      color: hsla(0, 0%, 100%, 0.3);
    }
  }
}
.ser_con {
  width: 100%;
  margin: 0 auto;
  padding-left: 5%;
  margin-top: 25px;
  flex: 1;
  overflow: hidden;

  li {
    width: 100%;
    height: 20px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.3);
    line-height: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    span {
      display: inline-block;
      width: 230px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
.loading {
  width: 40px;
  height: 40px;
  margin-left: 40%;
}
</style>
