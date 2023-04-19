// pages/main/index.ts
import { getLocalUserOpenId } from "../../services/users"
import { getSortedBookList } from "../../services/books"
import { BookDB, FavoriteDB } from "../../types/index"
import { addFavorite, isFavorite } from "../../services/favorite"

Page({
  data: {
    bookList: [] as BookDB[],
  },

  onLoad() {
    getSortedBookList('create_time').then(res => {
      this.setData({
        bookList: res,
      })
    })
  },

  toBookDetail(e: WechatMiniprogram.TouchEvent) {
    wx.navigateTo({
      url: `../bookDetail/index?bookDB=${encodeURIComponent(JSON.stringify(e.currentTarget.dataset.book))}`,
    })
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

    let favorite = {
      book_id: e.currentTarget.dataset.book._id
    } as FavoriteDB

    addFavorite(favorite).then(() => {
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
      })
    })
  }
})