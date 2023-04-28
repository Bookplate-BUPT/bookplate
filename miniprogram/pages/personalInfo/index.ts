// pages/personalInfo/index.ts
import { deepCopy, removeDBIdentifier } from "../../utils/utils"
import { DEFAULT_AVATAR_URL } from "../../consts/index"
import { addUser, getLocalUser, getLocalUserId, getLocalUserOpenId, getOpenId, getUserById, getUserByOpenId, setLocalUser, setLocalUserId, setLocalUserOpenId, updateUserById } from "../../services/users"
import { uploadImage } from "../../services/index"
import { User } from "../../types/index"

Page({
  data: {
    user: {} as User,
  },

  onLoad() {
    this.setData({
      // 修改的只是局部变量，不应该影响原数据，故需要深拷贝
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

    // 如果没有 openid 的话需要获取一下
    // 首次使用，或者退出登录再登录时会缺少 openid
    if (!getLocalUserOpenId()) {
      setLocalUserOpenId(await getOpenId())
    }

    // 没有主动设置头像则给予默认头像
    if (!this.data.user.avatar) {
      this.setData({
        ['user.avatar']: DEFAULT_AVATAR_URL
      })
    }
    // 设置头像路径为云存储路径，默认头像和云存储头像不额外进行存储
    if (this.data.user.avatar !== DEFAULT_AVATAR_URL && this.data.user.avatar.slice(0, 5) !== 'cloud') {
      this.setData({
        ['user.avatar']: await uploadImage(`avatars/${getLocalUserOpenId()}.jpg`, this.data.user.avatar)
      })
    }

    // 有用户的 _id 则说明肯定不是新用户，直接更新信息
    if (getLocalUserId()) {
      updateUserById(this.data.user, getLocalUserId())
    } else {
      // 若没有的话，也有可能是先前登录但退出过
      let userDB = await getUserByOpenId(getLocalUserOpenId())

      // 如果没有则添加新用户
      if (!userDB) {
        let userId = (await addUser(this.data.user))._id
        setLocalUserId(userId)
        this.setData({
          user: removeDBIdentifier(await getUserById(userId))
        })
      } else { // 有则更新用户信息
        // 补充一下缺失的字段信息
        this.setData({
          ['user.create_time']: userDB.create_time
        })
        updateUserById(this.data.user, userDB._id)
      }
    }

    wx.hideLoading()

    // 设置缓存和全局变量
    wx.setStorageSync('user', {
      _id: getLocalUserId(),
      _openid: getLocalUserOpenId(),
      user: this.data.user,
      time: (new Date()).getTime(),
    })
    setLocalUser(this.data.user)

    wx.navigateBack()
  }
})