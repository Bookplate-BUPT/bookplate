// pages/bookDetail/index.ts
import { isFavorite } from "../../services/favorite";
import { getUserPublicInfo } from "../../services/users";
import { BookDB, User } from "../../types/index";

interface Options {
  bookDB?: string   // encode 后的 JSON 序列化书籍字符串
}

Page({
  data: {
    bookDB: {} as BookDB, // 书籍信息
    seller: {} as User,   // 卖家信息
    isFavorite: false,    // 是否已被收藏
  },

  async onLoad(options: Options) {
    if (options.bookDB) {
      this.setData({
        bookDB: JSON.parse(decodeURIComponent(options.bookDB))
      })

      this.setData({
        seller: await getUserPublicInfo(this.data.bookDB._openid),
        isFavorite: await isFavorite(this.data.bookDB._id),
      })
    }
  },

  imagePreview(e: WechatMiniprogram.TouchEvent) {
    wx.previewImage({
      urls: this.data.bookDB.images,
      current: this.data.bookDB.images[e.currentTarget.dataset.index],
    })
  },

  onFavorite(e: WechatMiniprogram.TouchEvent) {
    
  },
})