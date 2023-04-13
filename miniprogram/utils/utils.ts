import { DBIdentifier } from '../types/index'

// 深拷贝
export const deepCopy = <T>(obj: T): T => {
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