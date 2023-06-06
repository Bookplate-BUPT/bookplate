import { convertDateToTimestamp, convertTimestampToDate, hasUserProperties } from "../utils/utils"
import { BookplateApp, DocumentID, User, UserDB, UserPublicInfo } from "../types/index"
const app = getApp<BookplateApp>()

// 在实际开发中，直接使用 app.globalData.xxx 也是可以的
// 但是为了避免反复获取应用实例，以及让代码更加简洁，我们可以封装一下

// 获取全局变量中的用户 _id
export const getLocalUserID = (): DocumentID => {
  return app.globalData._id
}

// 设置全局变量中的用户 _id
export const setLocalUserID = (id: DocumentID): void => {
  app.globalData._id = id
}

// 获取全局变量中的用户 _openid
export const getLocalUserOpenid = (): string => {
  return app.globalData._openid
}

// 设置全局变量中的用户 _openid
export const setLocalUserOpenid = (openid: string): void => {
  app.globalData._openid = openid
}

// 获取全局变量中的用户信息
export const getLocalUser = (): User => {
  return app.globalData.user
}

// 设置全局变量中的用户信息
export const setLocalUser = (user: User): void => {
  app.globalData.user = user
}

// 在当前云开发的背景下，小程序不需要需要输入账户密码来登录
// 只要用户进入小程序，就能调用云函数拿到 openid
// 但是为了保证登录与非登录（用户和游客）有区别
// 因此此处的登录，是根据全局变量中是否有 nickname 来判断的
// 退出登录也只是清除信息而已
// 我们以用户的信息（即昵称）是否完善来判断登录状态
export const isLogin = (): boolean => {
  return !!app.globalData.user.nickname
}

// 登出（清除本地用户信息）
export const logout = (): void => {
  setLocalUserID('' as DocumentID)
  setLocalUserOpenid('' as string)
  setLocalUser({} as User)
  wx.removeStorageSync('user')
}

// 通过云函数获得用户的 openid
export const getOpenid = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'bookplateFunctions',
      data: {
        type: 'getOpenid'
      }
    }).then(res => {
      resolve(res.result as string)
    }).catch(reject)
  })
}

// 通过 openid 获取自己的信息（由于权限问题，不能以此获取其他用户的信息）
export const getUserByOpenid = (openid: string): Promise<UserDB> => {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('users')
      .where({
        _openid: openid
      })
      .get()
      .then(res => {
        resolve(convertDateToTimestamp(res.data[0]) as UserDB)
      })
      .catch(reject)
  })
}

// 通过 _id 获取自己的信息（由于权限问题，不能以此获取其他用户的信息）
export const getUserByID = (id: DocumentID): Promise<UserDB> => {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('users')
      .doc(id)
      .get()
      .then(res => {
        resolve(convertDateToTimestamp(res.data) as UserDB)
      })
      .catch(reject)
  })
}

// 添加新用户
export const addUser = (user: User): Promise<DB.IAddResult> => {
  // 对于所有往数据库添加的数据，应该至少有一个内容为空的字段
  // 而不是没有这个字段
  if (!hasUserProperties(user)) return Promise.reject(new Error('缺少用户属性'))

  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('users')
      .add({
        data: user
      })
      .then(res => {
        resolve(res)
      })
      .catch(reject)
  })
}

// 更新用户信息
export const updateUserByID = (user: User, docId: DocumentID): Promise<DB.IUpdateResult> => {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('users')
      .doc(docId)
      .update({
        data: convertTimestampToDate(user)
      })
      .then(res => {
        resolve(res as DB.IUpdateResult)
      })
      .catch(reject)
  })
}

// 获取用户信息
export const getUserPublicInfo = (openid: string): Promise<UserPublicInfo> => {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'bookplateFunctions',
      data: {
        type: 'getUserPublicInfo',
        openid: openid,
      }
    }).then(res => {
      resolve(res.result as UserPublicInfo)
    }).catch(reject)
  })
}