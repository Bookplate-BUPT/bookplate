// pages/main/index.ts
import { getLocalUserOpenId } from "../../services/users"
import { getSortedBookList } from "../../services/books"
import { BookDB } from "../../types/index"
import { addFavorite, isFavorite } from "../../services/favorite"

Page({
  data: {
    bookList: [] as BookDB[],

    // 向子组件传递数据时，Date对象传入后会变成空对象
    // 为了能向 <main-book-card /> 传递正确的时间，以表示书籍是否为最新上架的书
    // 只能每当修改 bookList 时同步修改 bookIsNew
    bookIsNew: [] as boolean[],
  },

  onLoad() {
    getSortedBookList('create_time').then(res => {
      this.setData({
        bookList: res,
        bookIsNew: res.map(i => {
          return (new Date).getTime() - i.create_time.getTime() < 86400000 * 2
        })
      })
    })
  },

  toBookDetail(e: WechatMiniprogram.TouchEvent) {
    console.log(e)
  },

  async favoriteBook(e: WechatMiniprogram.TouchEvent) {
    // 无法收藏自己的书籍
    if (e.currentTarget.dataset.book._openid === getLocalUserOpenId()) {
      wx.showToast({
        title: '无法收藏自己的书籍',
        icon: 'none'
      })
      return
    }

    // 无法重复收藏
    if (await isFavorite(e.currentTarget.dataset.book._id)) {
      wx.showToast({
        title: '已在收藏列表中',
        icon: 'none'
      })
      return
    }

    addFavorite({
      book_id: e.currentTarget.dataset.book._id,
      create_time: new Date(),
    })
  }
})