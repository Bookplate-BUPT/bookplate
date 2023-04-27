// pages/bookDetail/index.ts
import { addFavorite, getFavoriteByBookId, removeFavorite } from "../../services/favorite";
import { getLocalUserOpenId, getUserPublicInfo } from "../../services/users";
import { BookDB, DocumentId, FavoriteDB, User } from "../../types/index";

interface Options {
  bookDB?: string   // encode 后的 JSON 序列化书籍字符串
}

Page({
  data: {
    bookDB: {} as BookDB, // 书籍信息
    seller: {} as User,   // 卖家信息

    favoriteId: '' as DocumentId  // 关于此书籍的收藏信息
  },

  async onLoad(options: Options) {
    if (options.bookDB) {
      this.setData({
        bookDB: JSON.parse(decodeURIComponent(options.bookDB))
      })

      this.setData({
        seller: await getUserPublicInfo(this.data.bookDB._openid),
        favoriteId: (await getFavoriteByBookId(getLocalUserOpenId(), this.data.bookDB._id))._id,
      })
    }
  },

  // 点击预览书籍大图
  imagePreview(e: WechatMiniprogram.TouchEvent) {
    wx.previewImage({
      urls: this.data.bookDB.images,
      current: this.data.bookDB.images[e.currentTarget.dataset.index],
    })
  },

  // 点击收藏按钮触发
  onFavorite() {
    // 无法收藏自己的书籍
    if (this.data.bookDB._openid === getLocalUserOpenId()) {
      wx.showToast({
        title: '无法收藏自己的书籍',
        icon: 'none'
      })
      return
    }

    // 取消收藏
    if (this.data.favoriteId) {
      removeFavorite(this.data.favoriteId).then(() => {
        wx.showToast({
          title: '取消收藏',
          icon: 'success'
        })
        this.setData({
          favoriteId: ''
        })
      })
      return
    }

    let favorite = {
      book_id: this.data.bookDB._id
    } as FavoriteDB

    addFavorite(favorite).then(res => {
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
      })
      this.setData({
        favoriteId: res._id,
      })
    })
  },
})