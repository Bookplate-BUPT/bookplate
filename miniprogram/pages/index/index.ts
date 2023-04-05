// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
import { Book } from "../../types"

Page({
  data: {

  },

  onLoad() {
    // wx.cloud.database().collection('goods')
    //   .get()
    //   .then(res => {
    //     console.log(res)
    //   })
    let a: Book = {
      name: "test",
      price: 1
    }

    console.log(a.name)
  }
})
