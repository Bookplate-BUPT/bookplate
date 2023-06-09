// ============== 小程序相关 ==============

// 小程序的应用实例默认是 IAppOption 类型
// 但其类型不支持自定义更多的全局变量
// 故而自定义一个 BookplateApp 类型继承它
// 每当添加全局变量的时候，需要先对类型进行扩展
export interface BookplateApp extends IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,

    _id: DocumentID,
    _openid: string,
    user: User,
  }
}

// ============== 数据库相关 ==============

// 数据库自动生成的 _id 和 _openid 类型
export type DocumentID = string | number

// 在云开发中，数据库的存储对 Date 类型有特殊的优化，腾讯官方建议使用 Date 类型存储时间信息
// 但在本地开发过程中，Date 的传递经常会出现空对象的情况
// 比如父组件向子组件传递含有 Date 的 Object，或是页面间的传递
// 为了省去开发中为了传递数据而来回将 Date 改变成时间戳的不便
// 每当从数据库获取数据时，结果里的 Date 就转成时间戳（也就是说，需要对所有数据库获取结果调用一次 convertDateToTimestamp 方法）
// 而上传数据至数据库时再从时间戳转成 Date 对象（也就是说，需要对所有数据库上传结果调用一次 convertTimestampToDate 方法）
// 此外，Date 表示的只是本地时间，为保证时间正确应采用 db.serverDate()

// 总结：
// 1. 添加数据到数据库时，数据时间为 DB.ServerDate 类型
// 2. 从数据库获取数据时，数据时间为 Date 类型
// 3. 小程序中的本地变量，数据时间为 number 类型
export type Time = DB.ServerDate | Date | number

export interface DBIdentifier {
  _id: DocumentID  // _id 是数据库中的唯一标识，用于区分不同的数据
  _openid: string  // _openid 是用户的唯一标识，用于区分不同的用户
}

export interface User {
  avatar: string            // 头像
  create_time: Time         // 注册时间
  grade: string             // 年级
  major: string             // 专业
  nickname: string          // 昵称
  role: string              // 身份
  school: string            // 学院
}
// 每当需要更新数据库时，上传数据里不能拥有 _id 和 _openid 字段
// 因此 add 和 update 数据库时，数据采用 User 类型
// 但是 get 数据时，返回的数据又含有 _id 和 _openid
// 所以 UserDB 用来表示数据库的返回结果类型
// 而 User 表示正常操作数据库的上传数据类型
export interface UserDB extends User, DBIdentifier { }
// 可公开的用户信息的类型定义
export type UserPublicInfo = Omit<UserDB, keyof {
  _id: DocumentID,
  create_time: Time,
  major: string,
}>

export interface Book {
  author: string            // 作者
  create_time: Time         // 用户上传时间
  contact: string           // 联系方式
  description: string       // 二手情况
  favorites: number         // 收藏量
  images: string[]          // 图片
  introduction: string      // 书籍描述
  isbn: string              // ISBN
  major: string             // 专业
  name: string              // 书名
  original_price: number    // 原价
  price: number             // 二手价格
  publish_time: string      // 出版时间
  publisher: string         // 出版社
  school: string            // 学院
  state: number             // 书籍状态，0 表示上架中，1 表示交易中，2 表示已卖出
  trade_location: string    // 交易地点
  views: number             // 浏览量
}
export interface BookDB extends Book, DBIdentifier { }

export interface Favorite {
  book_id: string           // 书籍ID
  create_time: Time         // 收藏时间
}
export interface FavoriteDB extends Favorite, DBIdentifier { }
// favorites 表和 books 表进行表连接后的结果类型
export interface FaVoriteAggregateResult extends FavoriteDB {
  book_detail: Book[]
}

export interface Message {
  content: string           // 消息内容
  create_time: Time         // 消息创建时间
  receiver: string          // 消息接受者 openid
  sender: string            // 消息发送者 openid
  type: number              // 消息类型
}
export interface MessageDB extends Message, DBIdentifier { }

export interface Relationship {
  create_time: Time         // 关系的建立时间
  is_readed: boolean        // 最后一次消息是否被接受者阅读
  last_content: string      // 记录聊天中最后一条发送的消息的内容
  last_content_type: number // 最后一条消息类型，0 表示文字
  last_create_time: Time    // 最后一条消息的发送时间
  last_send_number: number  // 当一方未读时，其所积累的未读信息条数
  last_sender: string       // 最后一条消息的发送者 openid
  user1_openid: string      // 用户 1 的 openid
  user1_avatar: string      // 用户 1 的头像
  user1_nickname: string    // 用户 1 的昵称
  user2_openid: string      // 用户 2 的 openid
  user2_avatar: string      // 用户 2 的头像
  user2_nickname: string    // 用户 2 的昵称
}
export interface RelationshipDB extends Relationship, DBIdentifier { }

export interface Trade {
  book_id: string               // 书籍ID
  buyer: string                 // 买家 openid
  contact_information: string   // 买家的联系方式
  seller: string                // 卖家 openid
  state: number                 // 交易的状态，0 表示未完成，1 表示待收货，2 表示已完成，3 表示已取消
  state_one_time: Time          // state 设置为 1 的时间
  state_three_time: Time        // state 设置为 3 的时间
  state_two_time: Time          // state 设置为 2 的时间
  state_zero_time: Time         // state 设置为 0 的时间
  price: number                 // 交易价格
  location: string              // 交易地点
}
export interface TradeDB extends Trade, DBIdentifier { }

// ============== 缓存相关 ==============
export interface UserStorage extends DBIdentifier {
  user: User              // 用户信息
  time: number            // 缓存时间
}