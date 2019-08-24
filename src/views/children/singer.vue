<template>
  <main class="main">
    <div class="singer_con">
      <div ref="items">
        <div v-for="(item,ind) in rightnav" :key="ind" class="singer_item_con">
          <h2>{{item.title}}</h2>
          <dl v-for="(ele,index) in item.child" :key="index">
            <dt>
              <img
                :src="`https://y.gtimg.cn/music/photo_new/T001R300x300M000${ele.Fsinger_mid}.jpg?max_age=2592000`"
              >
            </dt>
            <dd>{{ele.Fsinger_name}}</dd>
          </dl>
        </div>
      </div>
    </div>
    <ul class="rightnav">
      <li
        @click="gotoele(ind)"
        v-for="(item,ind) in rightnav"
        :key="ind"
        :class="inds==ind?'active':''"
      >{{item.title}}</li>
    </ul>
  </main>
</template>
<script>
import MHeader from "../../components/m-header.vue";
import jsonp from "jsonp";
import BScroll from "better-scroll";
import { setTimeout, clearTimeout } from "timers";
export default {
  props: {},
  components: {},
  data() {
    return {
      inds: 0, //下标
      title: "",
      rightnav: [
        { title: "热", child: [] },
        { title: "A", child: [] },
        { title: "B", child: [] },
        { title: "C", child: [] },
        { title: "D", child: [] },
        { title: "E", child: [] },
        { title: "F", child: [] },
        { title: "G", child: [] },
        { title: "H", child: [] },
        { title: "I", child: [] },
        { title: "J", child: [] },
        { title: "K", child: [] },
        { title: "L", child: [] },
        { title: "M", child: [] },
        { title: "N", child: [] },
        { title: "O", child: [] },
        { title: "P", child: [] },
        { title: "Q", child: [] },
        { title: "R", child: [] },
        { title: "S", child: [] },
        { title: "T", child: [] },
        { title: "U", child: [] },
        { title: "V", child: [] },
        { title: "W", child: [] },
        { title: "X", child: [] },
        { title: "Y", child: [] },
        { title: "Z", child: [] }
      ],
      myScroll: null,
      curdata: [],
      childH: []
    };
  },
  computed: {},
  methods: {
    //scroll事件
    scrolls() {
      this.myscroll = new BScroll(".singer_con", {
        probeType: 3,
         click:true
      });
      //楼层效果
      this.myscroll.on("scroll", e => {
        let y = Math.abs(e.y);
        this.childH.forEach((item, ind) => {
          if (y >= item && y < this.childH[ind + 1]) {
            this.inds = ind;
          }
        });
      });
    },
    //点击楼层
    gotoele(ind) {
      this.inds = ind;
      //点击滚动到指定位置
      this.myscroll.scrollToElement(this.$refs.items.children[ind], 1000);
    }
  },
  created() {
    let url =
      "https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq";
    jsonp(url, { param: "jsonpCallback" }, (err, res) => {
      res.data.list.forEach(element => {
        this.rightnav.forEach(item => {
          //处理数据
          if(item.title=="热"){
             if(parseInt(element.Fsort)<10){
                  item.child.push(element);
             }
          }
          if (element.Findex == item.title) {
            item.child.push(element);
          }
        });
      });
      //过滤掉没有数据的一项
      this.rightnav.forEach((item, ind) => {
        if (!item.child.length) {
          this.rightnav.splice(ind, 1);
        }
      });
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.timer=setTimeout(() => {
        this.scrolls();
        let childrens = [...this.$refs.items.children];
        childrens.forEach(item => {
          //获取每一个元素距离顶部的位置
          this.childH.push(item.offsetTop);
        });
      }, 100);
    });
  },
  beforeDestroy(){
      clearTimeout(this.timer);
  }
};
</script>
<style scoped lang="scss">
.singer_tit {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: hsla(0, 0%, 100%, 0.5);
  background: #333;
  position: fixed;
  top: 80px;
  left: 0;
}
.singer_con {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-bottom: 50px;
  .singer_item_con {
    width: 100%;
    margin-top: 10px;
    transition: all 1s;
    h2 {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: 12px;
      color: hsla(0, 0%, 100%, 0.5);
      background: #333;
    }
    dl {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      display: flex;
      color: hsla(0, 0%, 100%, 0.5);
      dt {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        img {
          width: 100%;
        }
      }
    }
  }
}
.rightnav {
  position: fixed;
  z-index: 30;
  right: 0;
  top: 15%;
  width: 20px;
  font-size: 14px;
  padding: 20px 0;
  border-radius: 10px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  font-family: Helvetica;
  li {
    height: 18px;
    color: hsla(0, 0%, 100%, 0.5);
  }
  .active {
    color: #ffcd32;
  }
}
</style>
