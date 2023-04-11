// pages/me/index.ts
import { getLocalUser } from "../../services/users"
import { User } from "../../types/index"

Page({
  data: {
    user: {} as User
  },

  onShow() {
    this.setData({
      user: getLocalUser()
    })
  },

  // 去个人信息页面
  toPersonalInfo() {
    wx.navigateTo({
      url: '../personalInfo/index',
    })
  }
})