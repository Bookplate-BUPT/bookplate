// pages/main/index.ts
import { BookplateApp, Book } from "../../types/index"
import { getBookByISBN } from "../../services/users"

const app = getApp<BookplateApp>()

Page({
  data: {
    // test: app.globalData.user
  },

  onLoad() {
    // app.globalData
    // wx.cloud.database().collection("test")
    //   .add({
    //     data: {
    //       a: 1,
    //       b: 2,
    //     }
    //   })
  },
})