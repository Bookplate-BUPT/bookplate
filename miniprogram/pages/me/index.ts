// pages/me/index.ts
import { getLocalUser, isLogin } from "../../services/users"
import { User } from "../../types/index"

Page({
  data: {
    user: {} as User,
    isLogin: isLogin(),
  },

  onShow() {
    this.setData({
      user: getLocalUser(),
      isLogin: isLogin(),
    })
  },

  // 去个人信息页面
  toPersonalInfo() {
    wx.navigateTo({
      url: '../personalInfo/index',
    })
  }
})