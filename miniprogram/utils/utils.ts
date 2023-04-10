import { BookplateApp } from "../types/index"
const app = getApp<BookplateApp>()

export const DEFAULT_AVATAR_URL: string = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

// 在当前云开发的背景下，小程序没有实际需要输入账户密码登录的概念
// 只要用户进入小程序，就能调用云函数拿到 openid
// 因此此处实际的登录，是根据全局变量中是否有 nickname 来判断的
// 退出登录也只是清除信息而已
// 因为其实时时刻刻我们都能拿到用户的 openid
// 但是为了保证依然有登录与非登录区别
// 我们以用户的信息（即昵称）是否完善来判断登录状态
export const isLogin = (): boolean => {
  return app.globalData.user.nickname !== undefined && app.globalData.user.nickname !== ''
}