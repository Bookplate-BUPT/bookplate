// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
import { Book } from "../../types"

Page({
  data: {
    tempBook: {} as Book,
    t: [] as Book[],
  },

  onLoad() {
    let a: Book = {
      name: "test",
      price: 1,
      original_price: 0
    }
    this.setData({
      tempBook: a
    })

    // console.log(this.data.tempBook)

  },

  testClick(e: WechatMiniprogram.BaseEvent) {
    wx.cloud.database().collection("test")
      .get()
      .then(res => {
        // let t: Book = res.data[0] as Book
        let bookList: Book[] = res.data as Book[]
        this.setData({
          t: bookList
        })
        // console.log(bookList[0])
      })

    // wx.cloud.callFunction({
    //   name: "getOpenid"
    // }).then(res => {
    //   console.log(res.result)
    // })

    // wx.cloud.database().collection("test")
    //   .add({
    //     data: this.data.tempBook
    //   })
  }
})
