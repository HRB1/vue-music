<template>
  <main class="main">
       <div class="rank_con">
         <div>
            <div class="rank_con_item" >
               <dl v-for="(item,ind) in allrank" :key="ind"
                    @click="goList(item.id)">
                    <dt><img :src="item.picUrl"/></dt>
                    <dd>
                        <p v-for="(el,index) in item.songList"
                          :key="index"
                          class="rank_singer">
                          <span>{{index+1}}</span>
                          {{el.songname+'-'+el.singername}}
                        </p>
                    </dd>
               </dl>
          </div>
         </div>
       </div>
  </main>
</template>
<script>
import jsonp from "jsonp";
import BScroll from "better-scroll"
export default {
  props:{

  },
  components:{

  },
  data(){
    return {
       allrank:[],//所有数据
    }
  },
  computed:{

  },
  methods:{

    scrolls(){
      new BScroll(".rank_con",{
        click:true
      })
    },
    //去详情列表
    goList(id){
        this.$router.push({path:"/rankDetail",query:{id}})
    }
  },
  created(){
    //
   let url="https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5";
     jsonp(url,{param:'jsonpCallback'},(err,res)=>{
       this.allrank=res.data.topList
    })
  },
  mounted(){
       this.$nextTick(() => {
          this.scrolls();
      })
  }
}
</script>
<style scoped lang="less">
.rank_con{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .rank_con_item{
    width: 100%;
    padding: 0 20px;
    padding-top: 20px;
    dl{
      display: flex;
      margin-bottom: 20px;
      dt{
        width: 100px;
        flex-shrink: 0;
        height: 100px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      dd{
        width: 100%;
        height: 100px;;
        background: #333;
        color: hsla(0,0%,100%,.3);
        padding-left: 15px;
        padding-top: 14px;
        p{
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              line-height: 26px;
              width:215px;
              display: block;
              font-size: 13px;
        }
      }
    }

  }
}
</style>
