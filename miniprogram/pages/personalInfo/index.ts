// pages/personalInfo/index.ts
import { BookplateApp, User } from "../../types/index"
import { DEFAULT_AVATAR_URL, isLogin } from "../../utils/utils"

const app = getApp<BookplateApp>()

Page({
  data: {
    user: {} as User,
  },

  onLoad() {
    if (isLogin()) {
      this.setData({
        user: app.globalData.user
      })
    }
  },

  onChange(e: WechatMiniprogram.TouchEvent) {
    if (e.currentTarget.dataset.key === 'avatar') {
      this.setData({
        ['user.avatar']: e.detail.avatarUrl
      })
    } else if (e.currentTarget.dataset.key === 'nickname') {
      // 在开发者工具中，"自动填充微信昵称"无法触发 input 事件，但在真机上可以触发
      // 因此在开发者工具中，使用 blur 事件来赋值
      this.setData({
        ['user.nickname']: e.type === 'blur' ? e.detail.value : e.detail,
      })
    } else if (e.currentTarget.dataset.key === 'role') {
      if (<string><unknown>e.detail === '游客') {
        this.setData({
          ['user.role']: e.detail,
          ['user.grade']: "",
          ['user.school']: "",
          ['user.major']: "",
        })
      } else {
        this.setData({
          ['user.role']: e.detail
        })
        console.log('修改成', e.detail)
      }
    } else if (e.currentTarget.dataset.key === 'school-major') {
      this.setData({
        ['user.school']: e.detail[0],
        ['user.major']: e.detail[1],
      })
    } else {
      this.setData({
        ['user.' + e.currentTarget.dataset.key]: e.detail
      })
    }
  },

  onConfirm() {
    // if (!this.data.user.nickname) {
    //   wx.showToast({
    //     title: '昵称不能为空',
    //     icon: 'error',
    //   })
    //   return
    // }

    // if (!this.data.user.avatar) {
    //   this.setData({
    //     ['user.avatar']: DEFAULT_AVATAR_URL
    //   })
    // }

    console.log(this.data.user)
  }
})