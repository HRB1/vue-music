<template>
  <div class="m-tab">
    <ul>
      <li v-for="(item,index) in  navs"
        :key="index"
      ><router-link :to="item.link" >{{item.title}}</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        {
          link: "/music/recommend",
          title: "推荐"
        },
        {
          link: "/music/singer",
          title: "歌手"
        },
        {
          link: "/music/rank",
          title: "排行"
        },
        {
          link: "/music/search",
          title: "搜索"
        }
      ]
    };
  },
  methods: {

  }
};
</script>

<style  lang="less">
@import "../style/index.less";
.m-tab {
  .w(375);
  .h(44);
  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    li {
      color: gray;
      font-size: @fs-s;
      text-align: center;
      width: 28px;
      height: 44px;;
      line-height: 44px;
      a{
          color: gray;
          text-decoration: none;
          padding-bottom: 4px;
      }
    }
    .router-link-exact-active{
      color: @fc-yellow;
      border-bottom: 2px solid #ffcd32;
    }
  }
}
</style>
