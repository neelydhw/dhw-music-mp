const baseUrl = "https://dhw-music-38234-8-1317417350.sh.run.tcloudbase.com";
export const get = (uri:string) => {
  wx.showLoading({
    title:"加载中"
  })
  return new Promise<any>((resolve,reject)=>{
    wx.request({
      url:baseUrl + uri,
      method:'GET',
      success: (res)=>{
        //handleHttpError(res,reject);
        resolve(res.data);
      },
      fail:reject,
      complete:()=>{
        wx.hideLoading();
      }
    })
  });
}

// const handleHttpError = (response,reject) => {
//   if(response !== 200){
//     reject("请求异常");
//   }
// }