// pages/me/index.ts
import { BookplateApp, User } from "../../types/index"

const app = getApp<BookplateApp>()

Page({
  data: {
    user: {} as User
  },

  onShow() {
    this.setData({
      user: app.globalData.user
    })
  },

  // 去个人信息页面
  toPersonalInfo() {
    wx.navigateTo({
      url: '../personalInfo/index',
    })
  }
})