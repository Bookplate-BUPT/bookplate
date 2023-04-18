import { DBIdentifier } from '../types/index'
import { Book, User } from "../types"
import { BookKeys, FavoriteKeys, UserKeys } from "../consts/index"

// 深拷贝
export const deepCopy = <T extends Object>(obj: T): T => {
  if (typeof obj !== 'object' || obj === null) return obj

  let result: any;
  if (Array.isArray(obj)) {
    result = [...obj]
  } else {
    result = {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = deepCopy(obj[key])
      }
    }
  }

  return result as T
}

// 返回去除了 DBIdentifier 属性的对象的深拷贝
export const removeDBIdentifier = <T extends DBIdentifier>(obj: T): Omit<T, keyof DBIdentifier> => {
  const { _id, _openid, ...rest } = obj
  return rest
}

// 检查对象是否包含所有属性
export const hasAllProperties = (obj: any, keys: string[]): boolean => {
  return keys.every(key => obj.hasOwnProperty(key))
}

// 检查对象是否包含所有用户属性
export const hasUserProperties = (obj: User): boolean => {
  return hasAllProperties(obj, UserKeys)
}

// 检查对象是否包含所有图书属性
export const hasBookProperties = (obj: Book): boolean => {
  return hasAllProperties(obj, BookKeys)
}

// 检查对象是否包含所有收藏属性
export const hasFavoriteProperties = (obj: any): boolean => {
  return hasAllProperties(obj, FavoriteKeys)
}