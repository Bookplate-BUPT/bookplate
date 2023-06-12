// pages/bookDetail/index.ts
import { addFavorite, getFavoriteByBookID, removeFavorite } from "../../services/favorite";
import { getLocalUserOpenid, getUserPublicInfo, isLogin } from "../../services/users";
import { BookDB, DocumentID, FavoriteDB, UserPublicInfo } from "../../types/index";

interface Options {
  bookDB?: string   // encode 后的 JSON 序列化书籍字符串
}

Page({
  data: {
    bookDB: {} as BookDB, // 书籍信息
    seller: {} as UserPublicInfo,   // 卖家信息

    favoriteID: '' as DocumentID  // 关于此书籍的收藏信息
  },

  async onLoad(options: Options) {
    if (options.bookDB) {
      this.setData({
        bookDB: JSON.parse(decodeURIComponent(options.bookDB))
      })

      let favoriteDB = await getFavoriteByBookID(getLocalUserOpenid(), this.data.bookDB._id)

      this.setData({
        seller: await getUserPublicInfo(this.data.bookDB._openid),
        favoriteID: favoriteDB ? favoriteDB._id : undefined,
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
    if (!isLogin()) {
      wx.showToast({
        title: '请先登录',
        icon: 'error',
      })
      return
    }

    // 无法收藏自己的书籍
    if (this.data.bookDB._openid === getLocalUserOpenid()) {
      wx.showToast({
        title: '无法收藏自己的书籍',
        icon: 'none'
      })
      return
    }

    // 取消收藏
    if (this.data.favoriteID) {
      removeFavorite(this.data.favoriteID).then(() => {
        wx.showToast({
          title: '取消收藏',
          icon: 'success'
        })
        this.setData({
          favoriteID: ''
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
        favoriteID: res._id,
      })
    })
  },

  // 联系卖家
  toChatroom() {
    if (!isLogin()) {
      wx.showToast({
        title: '请先登录',
        icon: 'error',
      })
      return
    }

    wx.navigateTo({
      url: `../chatroom/index?user=${encodeURIComponent(JSON.stringify(this.data.seller))}`,
    })
  },
})