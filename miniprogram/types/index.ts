// ============== 小程序相关 ==============

// 小程序的应用实例默认是 IAppOption 类型
// 但其类型不支持自定义更多的全局变量
// 故而自定义一个 BookplateApp 类型继承它
// 每当添加全局变量的时候，需要先对类型进行扩展
export interface BookplateApp extends IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,

    _id: DocumentId,
    _openid: string,
    user: User,
  }
}

// ============== 数据库相关 ==============

// 数据库自动生成的 _id 和 _openid 类型
export type DocumentId = string | number

// 对于每一个数据库的 add 操作，其返回数据类型都应该是 DBAddResult
export type DBAddResult = { _id: string, errMsg: string }

interface DBIdentifier {
  _id: DocumentId         // _id 是数据库中的唯一标识，用于区分不同的数据
  _openid: string         // _openid 是用户的唯一标识，用于区分不同的用户
}

export interface User {
  avatar: string          // 头像
  grade: string           // 年级
  major: string           // 专业
  nickname: string        // 昵称
  register_time: Date     // 注册时间
  role: string            // 身份
  school: string          // 学院
}
// 每当需要更新数据库时，上传数据里不能拥有 _id 和 _openid 字段
// 因此 add 和 update 数据库时，数据采用 User 类型
// 但是 get 数据时，返回的数据又含有 _id 和 _openid
// 所以 UserDB 用来表示数据库的返回结果类型
export interface UserDB extends User, DBIdentifier { }

export interface Book {
  author: string          // 作者
  create_time: Date       // 用户上传时间
  contact: string         // 联系方式
  description: string     // 书籍描述
  images: string[]        // 图片
  introduction: string    // 二手情况
  isbn: string            // ISBN
  major: string           // 专业
  name: string            // 书名
  original_price: number  // 原价
  price: number           // 二手价格
  publisher: string       // 出版社
  publish_time: string    // 出版时间
  school: string          // 学院
  status: number          // 书籍状态
  trade_location: string  // 交易地点
  views: number           // 浏览量
}
export interface BookDB extends Book, DBIdentifier { }

export interface Favorite {
  book_id: string         // 书籍ID
  create_time: Date       // 收藏时间
}
export interface FavoriteDB extends Favorite, DBIdentifier { }

export interface Message {
  content: string         // 消息内容
  create_time: Date       // 消息创建时间
  receiver: string        // 消息接受者 openid
  sender: string          // 消息发送者 openid
  type: number            // 消息类型
}
export interface MessageDB extends Message, DBIdentifier { }

export interface Relationship {
  is_readed: boolean            // 最后一次消息是否被接受者阅读
  last_content: string          // 记录聊天中最后一条发送的消息的内容
  last_content_type: number     // 最后一条消息类型
  last_create_time: Date        // 最后一条消息的发送时间
  last_send_number: number      // 当一方未读时，其所积累的未读信息条数
  last_sender: string           // 最后一条消息的发送者 openid
  user1: string                 // 用户 1 的 openid
  user1_avatar: string          // 用户 1 的头像
  user2: string                 // 用户 2 的 openid
  user2_avatar: string          // 用户 2 的头像
}
export interface RelationshipDB extends Relationship, DBIdentifier { }

export interface Trade {
  book_id: string               // 书籍ID
  buyer: string                 // 买家 openid
  contact_information: string   // 买家的联系方式
  seller: string                // 卖家 openid
  state: number                 // 交易的状态，0表示未完成，1表示待收货，2表示已完成，3表示已取消
  state_one_time: Date          // state 设置为 1 的时间
  state_three_time: Date        // state 设置为 3 的时间
  state_two_time: Date          // state 设置为 2 的时间
  state_zero_time: Date         // state 设置为 0 的时间
  price: number                 // 交易价格
  location: string              // 交易地点
}
export interface TradeDB extends Trade, DBIdentifier { }

// ============== 缓存相关 ==============
export interface UserStorage extends DBIdentifier {
  user: User              // 用户信息
  time: number            // 缓存时间
}