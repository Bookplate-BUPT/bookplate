// pages/sellBook/index.ts
import { removeDBIdentifier } from "../../utils/utils";
import { Book, BookDB } from "../../types/index";
import { searchBookByISBN } from "../../services/books";

interface Options {
  scan?: boolean    // 是否需要自动扫码
  bookDB?: BookDB   // 上传新书籍，还是修改已有书籍
}

Page({
  data: {
    book: {} as Book,
    bookDB: {} as BookDB,
  },

  onLoad(options: Options) {
    // console.log(options.scan)

    // 已有传进来的数据
    if (options.bookDB) {
      this.setData({
        book: removeDBIdentifier(options.bookDB)
      })
    }
  },

  onChange(e: WechatMiniprogram.TouchEvent) {
    if (e.currentTarget.dataset.key === 'school-major') {
      this.setData({
        ['book.school']: e.detail[0],
        ['book.major']: e.detail[1],
      })
    } else {
      this.setData({
        ['book.' + e.currentTarget.dataset.key]: e.detail
      })
    }
  },

  onClear() {
    if (this.data.bookDB._id) {
      this.setData({
        book: removeDBIdentifier(this.data.bookDB)
      })
    } else {
      this.setData({
        book: {} as Book
      })
    }
  },

  onConfirm() {
    console.log('confirm')
  },

  async onScanISBN() {
    let isbn = (await wx.scanCode({
      onlyFromCamera: false,
      scanType: ['barCode']
    })).result

    this.setData({
      book: await searchBookByISBN(isbn)
    })
  },
})