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

export interface Trade {
  _id?: DocumentId            // _id 是数据库中的唯一标识，用于区分不同的数据
  _openid?: string            // _openid 是用户的唯一标识，用于区分不同的用户
  book_detail: object         // 存放书籍的详细信息
  buyer_openid: string        // 存放买家的_openid，用来控制按钮的文案显示、随时取消预订
  contact_information: string // 买家的联系方式
  goods_id: string            // 商品ID
  seller_openid: string       // 卖家ID
  state: number               // 交易的状态，0表示未完成，1表示待收货，2表示已完成，3表示已取消
  state_one_time: Date        // state设置为 1 的时间
  state_three_time: Date      // state设置为 3 的时间
  state_two_time: Date        // state设置为 2 的时间
  state_zero_time: Date       // state设置为 0 的时间
  trade_price: string         // 交易价格
  trade_spot: string          // 交易地点
  trade_time: Date            // 注：已废除，但数据库没有清洗 等同于 state_zero_time
}

export interface Cart {
  _id?: DocumentId        // _id 是数据库中的唯一标识，用于区分不同的数据
  _openid?: string        // _openid 是用户的唯一标识，用于区分不同的用户
  add_time: Date          // 商品加入购物车的时间
  goods_id: string        // 商品ID
}

export interface Chatroom {
  _id?: DocumentId        // _id 是数据库中的唯一标识，用于区分不同的数据
  _openid?: string        // _openid 是用户的唯一标识，用于区分不同的用户
  content: string         // 消息内容
  recipient: string       // 消息接受者ID
  send_time: Date         // 消息发送时间
  sender: string          // 消息发送者ID
  type: number            // 0 为普通文字消息，1 暂定为图片消息
}

export interface Relationship {
  _id?: DocumentId              // _id 是数据库中的唯一标识，用于区分不同的数据
  _openid?: string              // _openid 是用户的唯一标识，用于区分不同的用户
  is_readed: boolean            // 最后一次消息是否被接受者阅读
  last_content: string          // 记录聊天中最后一条发送的消息的内容
  last_content_type: number     // 最后一条消息类型
  last_conversation_time: Date  // 最后一条消息的发送时间
  last_send_number: number      // 当一方未读时，其所积累的未读信息条数
  last_sender: string           // 最后一条消息的发送者 openid
  user1: string                 // 用户 1 的 openid
  user2: string                 // 用户 2 的 openid
}
