import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path:"/",
      redirect:"/music"//重定向到首页
    },
    //推荐
    {
      path:"/listDteail",
      name:"listDteail",
      component:()=>import("../views/listDetail/listDetail.vue")
    },
    //排行榜
    {
      path:"/rankDetail",
      name:"rankDetail",
      component:()=>import("../views/rankDetail/rankDetail.vue")
    },
    {
      path:"/music",
      name:"music",
      component:()=>import('../views/home.vue'),
      children:[//二级路由
        {
          path:"recommend",
          component:()=>import("../views/children/recommend.vue")
        },
        {
          path:"/music",
          redirect:"recommend"
        },
        {
          path:"singer",
          component:()=>import("../views/children/singer.vue")
        },
        {
          path:"search",
          component:()=>import("../views/children/search.vue")
        },
        {
          path:"rank",
          component:()=>import("../views/children/rank.vue")
        }

      ]
    },

  ]
})
