const reqs=require("superagent");
function getserachdate(){
  return  new Promise((resolve,reject)=>{
          reqs
           .get("http://ustbhuangyi.com/music/api/getDiscList")
           .query({
            g_tk:1928093487,
            inCharset:"utf-8",
            outCharset:"utf-8",
            notice:0,
            format:"json",
            platform:"yqq",
            hostUin:0,
            sin:0,
            ein:29,
            sortId:5,
            needNewCode:0,
            categoryId:10000000
           })
          .end((err,res)=>{
              if(err){
                  reject(err);
                  return;
              }
              resolve(res.text);
              // console.log(res.text);
          })
  })
}
getserachdate().then(res=>{
  console.log(res);
});
