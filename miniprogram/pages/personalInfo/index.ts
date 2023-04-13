// pages/personalInfo/index.ts
import { deepCopy } from "../../utils/utils"
import { DEFAULT_AVATAR_URL } from "../../consts/index"
import { addUser, getLocalUser, getLocalUserId, getLocalUserOpenId, getOpenId, getUserByOpenId, setLocalUser, setLocalUserId, setLocalUserOpenId, updateUser, uploadAvatar } from "../../services/users"
import { User } from "../../types/index"

Page({
  data: {
    user: {} as User,
  },

  onLoad() {
    this.setData({
      user: deepCopy(getLocalUser()),
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

    wx.showLoading({
      title: '保存中'
    })

    // 没有主动设置头像则给予默认头像
    if (!this.data.user.avatar) {
      this.setData({
        ['user.avatar']: DEFAULT_AVATAR_URL
      })
    }
    // 设置头像路径为云存储路径，默认头像和云存储头像不额外进行存储
    if (this.data.user.avatar !== DEFAULT_AVATAR_URL && this.data.user.avatar.slice(0, 5) !== 'cloud') {
      this.setData({
        ['user.avatar']: await uploadAvatar(getLocalUserOpenId(), this.data.user.avatar)
      })
    }

    // 如果没有 openid 的话需要获取一下
    // 首次使用，或者退出登录再登录时会缺少 openid
    if (!getLocalUserOpenId()) {
      setLocalUserOpenId(await getOpenId())
    }

    // 检查用户是不是第一次登录，先前存不存在此用户
    let userDB = await getUserByOpenId(getLocalUserOpenId())

    // 如果没有则添加新用户
    if (!userDB) {
      this.setData({
        ['user.register_time']: new Date()
      })
      setLocalUserId((await addUser(this.data.user))._id)
    } else { // 有则更新用户信息
      // 当用户已注册，退出再登录时，this.data.user 会缺失 register_time
      // 缺失后无法正常更新数据库信息，所以在此做一个补充
      this.setData({
        ['user.register_time']: new Date(userDB.register_time)
      })
      await updateUser(this.data.user, userDB._id)
    }

    wx.hideLoading()

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