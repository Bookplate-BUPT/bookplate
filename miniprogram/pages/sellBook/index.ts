// pages/sellBook/index.ts
import { removeDBIdentifier } from "../../utils/utils";
import { Book, BookDB, DocumentId } from "../../types/index";
import { addBook, getBookById, searchBookByISBN, updateBookById } from "../../services/books";
import { deleteImage, uploadImage } from "../../services/index";
import { getLocalUserOpenId } from "../../services/users";

interface Options {
  scan?: string         // 是否需要自动扫码
  bookId?: DocumentId   // 上传新书籍，还是修改已有书籍
}

// 需要检查数据是否完整的 key ，images 另外手动检查
const keys = ['name', 'author', 'isbn', 'publisher', 'publish_time', 'price', 'original_price', 'school', 'major', 'description', 'trade_location']

Page({
  data: {
    book: {} as Book,
    bookDB: {} as BookDB, // 若是修改书籍，此对象不为空
  },

  async onLoad(options: Options) {
    if (options.scan === 'true') this.onScanISBN()

    // 已有传进来的数据
    if (options.bookId) {
      let bookDB = await getBookById(options.bookId)
      this.setData({
        book: removeDBIdentifier(bookDB),
        bookDB: bookDB,
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

  async onConfirm() {
    for (let key of keys) {
      if (!this.data.book[key as keyof Book]) {
        wx.showToast({
          title: '信息不完整',
          icon: 'error',
        })
        return
      }
    }

    if (!this.data.book.images || !this.data.book.images.length) {
      wx.showToast({
        title: '至少需要一张图片',
        icon: 'none',
      })
      return
    }

    if (Number.isNaN(Number(this.data.book.price)) || Number.isNaN(Number(this.data.book.original_price))) {
      wx.showToast({
        title: '价格格式不正确',
        icon: 'error',
      })
      return
    }
    this.setData({
      ['book.price']: Number(Number(this.data.book.price).toFixed(2)),
      ['book.original_price']: Number(Number(this.data.book.original_price).toFixed(2)),
    })

    // 将已有书籍的云存储图片进行对比，删去的图片在云存储中也要删除
    if (this.data.bookDB._id) {
      let deleteImageList: string[] = []
      this.data.bookDB.images.forEach(i => {
        // 在修改后的图片列表里找不到原图了，则进行删除
        if (this.data.book.images.findIndex(j => j === i) === -1)
          deleteImageList.push(i)
      })
      deleteImage(deleteImageList)
    }

    // 将所有书籍图片上传至云存储
    let promiseList = this.data.book.images.map((i: string, idx: number) => {
      // 只有本地上传的图片，才上传到云存储
      if (i.slice(0, 11) === 'http://tmp/' || i.slice(0, 12) === 'wxfile://tmp') {
        let promise = uploadImage(`bookImages/${getLocalUserOpenId()}-${Date.now()}-${idx}.jpg`, i)
        promise.then(res => {
          this.setData({
            [`book.images[${idx}]`]: res
          })
        })
        return promise
      }

      // 若是云存储图片或网页链接，则不需要上传
      return i
    })
    await Promise.all(promiseList)

    // 更新已有书籍
    if (this.data.bookDB._id) {
      updateBookById(this.data.book, this.data.bookDB._id)
    } else { // 添加新书籍
      this.setData({
        ['book.contact']: this.data.book.contact === undefined ? '' : this.data.book.contact,
        ['book.favorites']: 0,
        ['book.state']: 0,
        ['book.views']: 0,
      })
      addBook(this.data.book)
    }

    wx.navigateBack()
  },

  async onScanISBN() {
    let isbn = (await wx.scanCode({
      onlyFromCamera: false,
      scanType: ['barCode']
    })).result

    wx.showLoading({
      title: '识别中'
    })

    this.setData({
      book: await searchBookByISBN(isbn)
    })

    wx.pageScrollTo({
      scrollTop: 9999,
      duration: 200,
    })

    wx.hideLoading()
  },
})