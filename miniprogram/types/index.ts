type DocumentId = string | number

export interface User {
  _id?: DocumentId        // _id 是数据库中的唯一标识，用于区分不同的数据
  _openid?: string        // _openid 是用户的唯一标识，用于区分不同的用户
  avatar: string          // 头像
  college: string         // 学院
  grade: string           // 年级
  major: string           // 专业
  nickname: string        // 昵称
  register_time: Date     // 注册时间
}

export interface Book {
  _id?: DocumentId        // _id 是数据库中的唯一标识，用于区分不同的数据
  _openid?: string        // _openid 是用户的唯一标识，用于区分不同的用户
  author: string          // 作者
  college: string         // 学院
  contact: string         // 联系方式
  description: string     // 书籍描述
  images: string[]        // 图片
  introduction: string    // 二手情况
  isbn: string            // ISBN
  major: string           // 专业
  name: string            // 书名
  original_price: string  // 原价
  price: string           // 二手价格
  publisher: string       // 出版社
  publish_time: Date      // 出版时间
  upload_time: Date       // 用户上传时间
  status: number          // 书籍状态
  trade_location: string  // 交易地点
  views: number           // 浏览量
}

