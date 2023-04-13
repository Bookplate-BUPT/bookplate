// pages/guide/index.ts

Page({
  data: {

  },

  onLoad() {

  },

  toSellBook(e: WechatMiniprogram.TouchEvent) {
    wx.navigateTo({
      url: `/pages/sellBook/index?scan=${e.currentTarget.dataset.scan}`
    })
  }
})