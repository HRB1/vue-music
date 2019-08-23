const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports={
  devServer:{
    // port:3000,
    proxy:{ //代理
      '/api':{
         target:'http://ustbhuangyi.com',//目标服务路径
         changeOrigin:true,
         pathRewrite:{
           '^/api':''
         }
      }
    }
  },
  chainWebpack:(config)=>{
    config.resolve.alias
   .set('@',path.join(__dirname,'./src'))
   .set('components',path.join(__dirname,'./src/components'))
   .set('pages',path.join(__dirname,'./src/pages'))
   .set('style',resolve('./src/style'))
  }
}
