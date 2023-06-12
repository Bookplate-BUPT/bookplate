// pages/message/index.ts
import { convertDateToTimestamp } from "../../utils/utils";
import { getRelationshipList } from "../../services/contact";
import { getLocalUserOpenid, isLogin } from "../../services/users";
import { RelationshipDB, UserPublicInfo } from "../../types/index";

Page({
  data: {
    relationshipList: [] as RelationshipDB[],
    userOpenid: '',       // 用户自己的 openid

    watcherIsSet: false,  // 监听器是否已经建立
  },

  onLoad() {

  },

  async onShow() {
    this.setData({
      userOpenid: getLocalUserOpenid()
    })

    // 如果已登录，并且还没建立关系监听
    if (isLogin() && !this.data.watcherIsSet) {
      await wx.cloud.database().collection('relationships')
        .where(
          wx.cloud.database().command.or([
            {
              user1_openid: getLocalUserOpenid(),
            },
            {
              user2_openid: getLocalUserOpenid(),
            }
          ])
        )
        .watch({
          onChange: await this.relationshipOnChange.bind(this),
          onError(err) {
            console.log(err)
          },
        })

      this.setData({
        watcherIsSet: true,
      })
    }
  },

  // 监听到关系发生变化时调用
  async relationshipOnChange(snapshot: DB.ISnapshot) {
    // 初次加载
    if (snapshot.type === 'init') {
      wx.showLoading({
        title: '加载中'
      })
      this.setData({
        relationshipList: await getRelationshipList(getLocalUserOpenid())
      })
      wx.hideLoading()
    } else { // 后续有关系更新
      let relationshipList = [...this.data.relationshipList]

      // 遍历处理新的更改
      for (const docChange of snapshot.docChanges) {
        if (docChange.queueType === 'update') { // 有关系更新，则直接覆盖对应的本地关系即可
          for (let i = 0; i < relationshipList.length; i++) {
            if (relationshipList[i]._id === docChange.docId) {
              relationshipList[i] = convertDateToTimestamp(docChange.doc) as RelationshipDB
              break
            }
          }
        } else if (docChange.queueType === 'enqueue') { // 新关系加入
          relationshipList.push(convertDateToTimestamp(docChange.doc) as RelationshipDB)
        }
      }

      this.setData({
        relationshipList: relationshipList.sort((x: RelationshipDB, y: RelationshipDB) => (y.last_create_time as number) - (x.last_create_time as number))
      })
    }
  },

  // 页面隐藏
  onHide() {
    // 页面销毁时监听器失效，置为false
    wx.onAppHide(() => {
      this.setData({
        watcherIsSet: false,
      })
    })
  },

  // 前往聊天页面
  toChatroom(e: WechatMiniprogram.TouchEvent) {
    let relationship = e.currentTarget.dataset.relationship as RelationshipDB

    // 对方用户的信息
    let user = {} as UserPublicInfo
    if (relationship.user1_openid === this.data.userOpenid) {
      user._openid = relationship.user2_openid
      user.avatar = relationship.user2_avatar
      user.nickname = relationship.user2_nickname
    } else {
      user._openid = relationship.user1_openid
      user.avatar = relationship.user1_avatar
      user.nickname = relationship.user1_nickname
    }

    wx.navigateTo({
      url: `../chatroom/index?user=${encodeURIComponent(JSON.stringify(user))}&?relationshipID=${relationship._id}`
    })
  },
})