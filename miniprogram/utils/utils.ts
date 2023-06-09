import { DBIdentifier } from '../types/index'
import { Book, User } from "../types"
import { BOOK_KEYS, FAVORITE_KEYS, MESSAGE_KEYS, RELATIONSHIP_KEYS, USER_KEYS } from "../consts/index"

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
  // 先检查是不是数组
  if (Array.isArray(obj)) {
    return obj.map(item => convertDateToTimestamp(item)) as unknown as T
  }

  for (let key in obj) {
    // 递归转换
    if (obj[key] instanceof Object) {
      obj[key] = convertDateToTimestamp(obj[key] as Object) as T[Extract<keyof T, string>]
    }
    // 字段为 Date 类型进行转换
    if (obj[key] instanceof Date) {
      obj[key] = (obj[key] as unknown as Date).getTime() as unknown as T[Extract<keyof T, string>]
    }
    // 有些情况下，数据库中的 Date 对象会被转换为字符串，此时也需要转换
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(obj[key] as unknown as string)) {
      obj[key] = new Date(obj[key] as unknown as string).getTime() as unknown as T[Extract<keyof T, string>]
    }
  }
  return obj
}

// 将对象中的时间戳转换为 Date 类型，将数据上传至数据库时调用
// 但一般情况下，上传后往往还会有后续的数据操作
// 为了避免浅拷贝导致本地变量的时间出现格式差错，此处采用深拷贝
export const convertTimestampToDate = <T extends Object>(obj: T): T => {
  const res = deepCopy(obj)
  for (let key in res) {
    // 递归转换
    if (res[key] instanceof Object) {
      res[key] = convertTimestampToDate(res[key] as Object) as T[Extract<keyof T, string>]
    }
    // 字段为时间戳才进行转换
    if (typeof res[key] === 'number' && res[key] as unknown as number > 1000000000000 && res[key] as unknown as number < 10000000000000) {
      res[key] = new Date(res[key] as unknown as number) as unknown as T[Extract<keyof T, string>]
    }
  }
  return res
}

// 对比两个对象是否相等
export const isEqual = <T extends { [key: string]: any }>(obj1: T, obj2: T): boolean => {
  // 先检查是不是数组
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false
    return obj1.every((item, index) => isEqual(item, obj2[index]))
  }

  // 检查是否为基本类型
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return obj1 === obj2
  }

  // 检查是否为 Date 对象
  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime()
  }

  // 如果都为对象
  if (obj1 instanceof Object && obj2 instanceof Object) {
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)
    if (keys1.length !== keys2.length) return false
    return keys1.every(key => isEqual(obj1[key], obj2[key]))
  }

  return false
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

// 检查对象是否包含所有关系属性
export const hasRelationshipProperties = (obj: any): boolean => {
  return hasAllProperties(obj, RELATIONSHIP_KEYS)
}

// 检查对象是否包含所有消息属性
export const hasMessageProperties = (obj: any): boolean => {
  return hasAllProperties(obj, MESSAGE_KEYS)
}