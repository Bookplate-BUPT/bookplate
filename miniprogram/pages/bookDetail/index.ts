// pages/bookDetail/index.ts
import { BookDB } from "../../types/index";

interface Options {
  bookDB?: string   // encode 后的 JSON 序列化书籍字符串
}

Page({
  data: {
    bookDB: {} as BookDB
  },

  onLoad(options: Options) {
    if (options.bookDB) {
      this.setData({
        bookDB: JSON.parse(decodeURIComponent(options.bookDB))
      })
    }
  },
})