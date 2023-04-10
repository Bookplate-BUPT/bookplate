// pages/sellBook/index.ts
const app = getApp<IAppOption>()
import { Book } from "miniprogram/types/index";

Page({
  data: {
    book: {
      school: ''
    } as Book,

  },

  onLoad() {
    // this.setData({
    //   book: {
    //     name: '123',
    //   } as Book
    // })
  },

  testClick() {
    console.log(this.data.book)
  },

  onChange(e: WechatMiniprogram.TouchEvent) {
    console.log(e)

    this.setData({
      ['book.' + e.currentTarget.dataset.key]: e.detail
    })
  },
})