import { convertDateToTimestamp, hasFavoriteProperties } from "../utils/utils"
import { DocumentId, Favorite, FaVoriteAggregateResult, FavoriteDB } from "../types/index"

// 通过 docId 获取收藏信息
export const getFavoriteById = (id: DocumentId): Promise<FavoriteDB> => {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('favorites')
      .doc(id)
      .get()
      .then(res => {
        resolve(convertDateToTimestamp(res.data) as FavoriteDB)
      })
      .catch(reject)
  })
}

// 通过书籍 ID 获取收藏信息
export const getFavoriteByBookId = (openid: string, id: DocumentId): Promise<FavoriteDB> => {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('favorites')
      .where({
        _openid: openid,
        book_id: id,
      })
      .get()
      .then(res => {
        resolve(convertDateToTimestamp(res.data[0]) as FavoriteDB)
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
        resolve(res)
      })
      .catch(reject)
  })
}

// 取消收藏
export const removeFavorite = (id: DocumentId): Promise<DB.IRemoveResult> => {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('favorites')
      .doc(id)
      .remove()
      .then(res => {
        resolve(res)
      })
      .catch(reject)
  })
}

// 获取收藏列表
export const getFavoriteList = (openid: string, limit: number, skip: number): Promise<FaVoriteAggregateResult[]> => {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'bookplateFunctions',
      data: {
        type: 'getFavoriteList',
        openid: openid,
        limit: limit,
        skip: skip,
      }
    }).then(res => {
      resolve(convertDateToTimestamp((res.result as any).list) as FaVoriteAggregateResult[])
    }).catch(reject)
  })
}