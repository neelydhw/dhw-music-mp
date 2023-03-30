import { getToken, removeToken, setToken } from "../utils/auth";

const baseUrl = "https://dhw-music-38234-8-1317417350.sh.run.tcloudbase.com";
export const get = (uri: string) => {
  wx.showLoading({
    title: "加载中"
  })
  return new Promise<any>((resolve, reject) => {
    wx.request({
      url: baseUrl + uri,
      method: 'GET',
      success: (res) => {
        //handleHttpError(res,reject);
        resolve(res.data);
      },
      fail: reject,
      complete: () => {
        wx.hideLoading();
      }
    })
  });
}

export const post = (uri: string, data: object) => {
  wx.showLoading({
    title: '加载中'
  });
  return new Promise<Object>((resolve, reject) => {
    wx.request({
      url: baseUrl + uri,
      method: "POST",
      data,
      success: (res) => {
        if (res.statusCode === 401) {
          removeToken();
          const currentPages = getCurrentPages();
          const currentRoute = currentPages[currentPages.length - 1].route;
          if (currentRoute !== "pages/login/index") {
            wx.navigateTo({
              url: "/pages/login/index"
            });
          }
          wx.showToast({
            title: "用户未登录",
            icon: "error"
          })
        }
        _handleToken(res.header);

        //
      },
      fail: () => { reject },
      complete: () => {
        wx.hideLoading();
      }
    })
  });
}

const _handleToken = (header: any) => {
 
  const token = header['authorization'] || null
  if (token && getToken() !== token) {
    setToken(token)
    wx.navigateBack()
  }
}