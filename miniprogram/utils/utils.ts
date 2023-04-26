import { DBIdentifier } from '../types/index'
import { Book, User } from "../types"
import { BOOK_KEYS, FAVORITE_KEYS, USER_KEYS } from "../consts/index"

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
        result[key] = deepCopy(obj[key] as Object)
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

// 将对象中的 Date 类型转换为时间戳，一般在获取数据库数据的时候调用
export const convertDateToTimestamp = <T extends Object>(obj: T): T => {
  for (let key in obj) {
    // 递归转换
    if (obj[key] instanceof Object) {
      obj[key] = convertDateToTimestamp(obj[key] as Object) as T[Extract<keyof T, string>]
    }
    if (obj[key] instanceof Date) {
      obj[key] = (obj[key] as unknown as Date).getTime() as unknown as T[Extract<keyof T, string>]
    }
  }
  return obj
}

// 将对象中的时间戳转换为 Date 类型，将数据上传至数据库时调用
// 但一般情况下，上传后往往还会有后续的数据操作
// 为了避免浅拷贝导致本地变量的时间出现格式差错，此处采用深拷贝
export const convertTimestampToTime = <T extends Object>(obj: T): T => {
  const res = deepCopy(obj)
  for (let key in res) {
    // 递归转换
    if (res[key] instanceof Object) {
      res[key] = convertTimestampToTime(res[key] as Object) as T[Extract<keyof T, string>]
    }
    // 字段名拥有 time 单词且类型为时间戳时才进行转换
    if (key.includes('time') && typeof res[key] === 'number') {
      res[key] = new Date(res[key] as unknown as number) as unknown as T[Extract<keyof T, string>]
    }
  }
  return res
}

// 以下属性检查是仅用于开发者的
// 在开发中，开发者错误上传了缺少字段的数据时抛出错误
// 而在判断用户信息填写是否为空时不应使用

// 检查对象是否包含所有属性
export const hasAllProperties = (obj: any, keys: string[]): boolean => {
  return keys.every(key => obj.hasOwnProperty(key))
}

// 检查对象是否包含所有用户属性
export const hasUserProperties = (obj: User): boolean => {
  return hasAllProperties(obj, USER_KEYS)
}

// 检查对象是否包含所有图书属性
export const hasBookProperties = (obj: Book): boolean => {
  return hasAllProperties(obj, BOOK_KEYS)
}

// 检查对象是否包含所有收藏属性
export const hasFavoriteProperties = (obj: any): boolean => {
  return hasAllProperties(obj, FAVORITE_KEYS)
}