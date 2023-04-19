// app.ts
import { DEVELOPMENT_ENV } from "./config";
import { BookplateApp, User, UserStorage } from "./types/index";

App<BookplateApp>({
  globalData: {
    _id: '',
    _openid: '',
    user: {} as User,
  },

  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        traceUser: true,
        env: DEVELOPMENT_ENV
      });
    }

    let userStorage = wx.getStorageSync('user') as UserStorage
    this.globalData._id = userStorage._id
    this.globalData._openid = userStorage._openid

    // getStorage 获取不到东西的话返回的是 undefined
    // 但我们希望 user 至少是一个空对象，而不是 undefined
    // 这么设计的原因是，我们在判断用户是否登录的时候，是根据 user.nickname 来判断的
    // 如果 user 是 undefined，那么 user.nickname 就会报错
    // 同时因为这里是 onLaunch ，由于小程序的生命周期顺序
    // 导致这里不能使用 setLocalUser 去设置全局变量
    this.globalData.user = userStorage.user || {}
  },
})