import { hasFavoriteProperties } from "../utils/utils"
import { DocumentId, Favorite } from "../types/index"
import { getLocalUserOpenId } from "./users"

// 检查是否已经收藏书籍
export const isFavorite = (id: DocumentId): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('favorites')
      .where({
        _openid: getLocalUserOpenId(),
        book_id: id,
      })
      .get()
      .then(res => {
        resolve(res.data.length > 0)
      })
      .catch(reject)
  })
}

// 添加收藏
export const addFavorite = (favorite: Favorite): Promise<DB.IAddResult> => {
  favorite.create_time = wx.cloud.database().serverDate()
  if (!hasFavoriteProperties(favorite)) return Promise.reject(new Error('缺少收藏属性'))

  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('favorites')
      .add({
        data: favorite
      })
      .then(res => {
        resolve(res as DB.IAddResult)
      })
      .catch(reject)
  })
}