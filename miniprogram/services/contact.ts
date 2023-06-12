import { convertDateToTimestamp, hasMessageProperties, hasRelationshipProperties } from "../utils/utils";
import { Message, Relationship, RelationshipDB } from "../types/index";

// 添加联系人关系
export const addRelationship = (relationship: Relationship): Promise<DB.IAddResult> => {
  if (!hasRelationshipProperties(relationship)) return Promise.reject(new Error('缺少关系属性'))

  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('relationships')
      .add({
        data: relationship
      })
      .then(res => {
        resolve(res)
      })
      .catch(reject)
  })
}

// 通过两者的 openid 获取联系人关系
export const getRelationshipByOpenid = (openid1: string, openid2: string): Promise<RelationshipDB> => {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('relationships')
      .where(
        wx.cloud.database().command.or([
          {
            user1_openid: openid1,
            user2_openid: openid2,
          },
          {
            user1_openid: openid2,
            user2_openid: openid1,
          }
        ])
      )
      .get()
      .then(res => {
        resolve(convertDateToTimestamp(res.data[0]) as RelationshipDB)
      })
      .catch(reject)
  })
}

// 获取跟某人有关的所有关系
export const getRelationshipList = (openid: string): Promise<RelationshipDB[]> => {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('relationships')
      .where(
        wx.cloud.database().command.or([
          {
            user1_openid: openid
          },
          {
            user2_openid: openid
          }
        ])
      )
      .get()
      .then(res => {
        resolve(convertDateToTimestamp(res.data) as RelationshipDB[])
      })
      .catch(reject)
  })
}

// 发送消息
export const addMessage = (message: Message): Promise<DB.IAddResult> => {
  if (!hasMessageProperties(message)) return Promise.reject(new Error('缺少消息属性'))

  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('messages')
      .add({
        data: message
      })
      .then(resolve)
      .catch(reject)
  })
}