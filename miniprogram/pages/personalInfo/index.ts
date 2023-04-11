// pages/personalInfo/index.ts
import { User } from "../../types/index"
import { DEFAULT_AVATAR_URL } from "../../utils/utils"
import { addUser, getLocalUser, getLocalUserId, getLocalUserOpenId, getOpenId, getUserByOpenId, setLocalUser, setLocalUserId, setLocalUserOpenId, updateUser } from "../../services/users"

Page({
  data: {
    user: {} as User,
  },

  onLoad() {
    this.setData({
      user: getLocalUser(),
    })
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

  async onConfirm() {
    if (!this.data.user.nickname) {
      wx.showToast({
        title: '昵称不能为空',
        icon: 'error',
      })
      return
    }

    // 没有主动设置头像则给予默认头像
    if (!this.data.user.avatar) {
      this.setData({
        ['user.avatar']: DEFAULT_AVATAR_URL
      })
    }

    // 如果没有 openid 的话需要获取一下
    // 首次使用，或者退出登录再登录时会缺少 openid
    if (!getLocalUserOpenId()) {
      setLocalUserOpenId((await getOpenId()).openid)
    }

    // 检查用户是不是第一次登录，先前存不存在此用户
    let userDB = await getUserByOpenId(getLocalUserOpenId())

    // 如果没有则添加新用户
    if (!userDB) {
      this.setData({
        ['user.register_time']: new Date()
      })
      console.log(this.data.user.register_time)
      setLocalUserId((await addUser(this.data.user))._id)
    } else { // 有则更新用户信息
      updateUser(this.data.user, userDB._id)
    }

    // 设置缓存和全局变量
    wx.setStorageSync('user', {
      _id: getLocalUserId(),
      _openid: getLocalUserOpenId(),
      user: this.data.user,
      time: new Date(),
    })
    setLocalUser(this.data.user)

    wx.navigateBack()
  }
})