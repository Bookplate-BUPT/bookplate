// 默认头像
export const DEFAULT_AVATAR_URL: string = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

// 书籍适用的学院和专业
export const BOOK_SCHOOL_WITH_MAJOR = {
  '所有学院': ['所有专业'],
  '电子工程学院': ['所有专业', '电子科学与技术', '电子信息科学与技术', '电子信息类', '光电信息科学与工程'],
  '国际学院': ['所有专业', '电信工程及管理', '电子信息工程', '物联网工程', '智能科学与技术'],
  '经济管理学院': ['所有专业', '大数据管理与应用金融科技', '公共事业管理', '工商管理', '工商管理类'],
  '计算机学院': ['所有专业', '计算机科学与技术', '计算机类', '软件工程', '数据科学与大数据技术', '网络工程'],
  '理学院': ['所有专业', '理科试验班', '数学与应用数学', '信息与计算科学', '应用物理学'],
  '人工智能学院': ['所有专业', '人工智能', '人工智能（大类招生）', '信息工程', '自动化', '智能医学工程'],
  '人文学院': ['所有专业', '法学', '日语', '英语'],
  '数字媒体与设计艺术学院': ['所有专业', '数字媒体技术', '数字媒体艺术', '网络与新媒体', '智能交互设计'],
  '网络空间安全学院': ['所有专业', '密码科学与技术', '网络空间安全', '网络空间安全（大类招生）', '信息安全'],
  '未来学院': ['所有专业', '电子科学与技术', '电子信息类（元班）', '计算机科学与技术', '计算机类（元班）', '通信工程', '网路空间安全'],
  '现代邮政学院': ['所有专业', '电子商务', '管理科学与工程类', '机械工程', '邮政工程', '邮政管理', '自动化类'],
  '信息与通信工程学院': ['所有专业', '电子信息工程', '空间信息与数字技术', '通信工程', '通信工程（大类招生）'],
}

// 入学年份
export const GRADE = ['2022', '2021', '2020', '2019', '2018', '2017', '2016']

// 用户的学院和专业
export const SCHOOL_WITH_MAJOR = {
  '电子工程学院': ['电子科学与技术', '电子信息科学与技术', '电子信息类', '光电信息科学与工程'],
  '国际学院': ['电信工程及管理', '电子信息工程', '物联网工程', '智能科学与技术'],
  '经济管理学院': ['大数据管理与应用金融科技', '公共事业管理', '工商管理', '工商管理类'],
  '计算机学院': ['计算机科学与技术', '计算机类', '软件工程', '数据科学与大数据技术', '网络工程'],
  '理学院': ['理科试验班', '数学与应用数学', '信息与计算科学', '应用物理学'],
  '人工智能学院': ['人工智能', '人工智能（大类招生）', '信息工程', '自动化', '智能医学工程'],
  '人文学院': ['法学', '日语', '英语'],
  '数字媒体与设计艺术学院': ['数字媒体技术', '数字媒体艺术', '网络与新媒体', '智能交互设计'],
  '网络空间安全学院': ['密码科学与技术', '网络空间安全', '网络空间安全（大类招生）', '信息安全'],
  '未来学院': ['电子科学与技术', '电子信息类（元班）', '计算机科学与技术', '计算机类（元班）', '通信工程', '网路空间安全'],
  '现代邮政学院': ['电子商务', '管理科学与工程类', '机械工程', '邮政工程', '邮政管理', '自动化类'],
  '信息与通信工程学院': ['电子信息工程', '空间信息与数字技术', '通信工程', '通信工程（大类招生）'],
}

// 用户角色
export const ROLE = ['游客', '北邮人']

// 交易校区
export const TRADE_LOCATION = ['沙河校区', '西土城校区', '沙河或西土城校区']

// 用户字段
export const USER_KEYS = ['avatar', 'create_time', 'grade', 'major', 'nickname', 'role', 'school']

// 书籍字段
export const BOOK_KEYS = ['author', 'create_time', 'contact', 'description', 'favorites', 'images', 'introduction', 'isbn', 'major', 'name', 'original_price', 'publish_time', 'publisher', 'school', 'state', 'trade_location', 'views']

// 收藏字段
export const FAVORITE_KEYS = ['book_id', 'create_time']

// 关系字段
export const RELATIONSHIP_KEYS = ['create_time', 'is_readed', 'last_content', 'last_content_type', 'last_create_time', 'last_send_number', 'last_sender', 'user1_openid', 'user1_avatar', 'user1_nickname', 'user2_openid', 'user2_avatar', 'user2_nickname']

// 消息字段
export const MESSAGE_KEYS = ['content', 'create_time', 'receiver', 'sender', 'type']

// 书籍类型选项
export const BOOK_TYPE_OPTION = [
  {
    text: '全部书籍',
  },
  {
    text: '所有学院',
  },
  {
    text: '电子工程学院',
    children: [
      {
        text: '所有专业',
        id: 0,
      },
      {
        text: '电子科学与技术',
        id: 1,
      },
      {
        text: '电子信息科学与技术',
        id: 2,
      },
      {
        text: '电子信息类',
        id: 3,
      },
      {
        text: '光电信息科学与工程',
        id: 4,
      },
    ],
  },
  {
    text: '国际学院',
    children: [
      {
        text: '所有专业',
        id: 0,
      },
      {
        text: '电信工程及管理',
        id: 1,
      },
      {
        text: '电子信息工程',
        id: 2,
      },
      {
        text: '物联网工程',
        id: 3,
      },
      {
        text: '智能科学与技术',
        id: 4,
      },
    ],
  },
  {
    text: '经济管理学院',
    children: [
      {
        text: '所有专业',
        id: 0,
      },
      {
        text: '大数据管理与应用金融科技',
        id: 1,
      },
      {
        text: '公共事业管理',
        id: 2,
      },
      {
        text: '工商管理',
        id: 3,
      },
      {
        text: '工商管理类',
        id: 4,
      },
    ],
  },
  {
    text: '计算机学院',
    children: [
      {
        text: '所有专业',
        id: 0,
      },
      {
        text: '计算机科学与技术',
        id: 1,
      },
      {
        text: '计算机类',
        id: 2,
      },
      {
        text: '软件工程',
        id: 3,
      },
      {
        text: '数据科学与大数据技术',
        id: 4,
      },
      {
        text: '网络工程',
        id: 5,
      },
    ],
  },
  {
    text: '理学院',
    children: [
      {
        text: '所有专业',
        id: 0,
      },
      {
        text: '理科试验班',
        id: 1,
      },
      {
        text: '数学与应用数学',
        id: 2,
      },
      {
        text: '信息与计算科学',
        id: 3,
      },
      {
        text: '应用物理学',
        id: 4,
      },
    ],
  },
  {
    text: '人工智能学院',
    children: [
      {
        text: '所有专业',
        id: 0,
      },
      {
        text: '人工智能',
        id: 1,
      },
      {
        text: '人工智能（大类招生）',
        id: 2,
      },
      {
        text: '信息工程',
        id: 3,
      },
      {
        text: '自动化',
        id: 4,
      },
      {
        text: '智能医学工程',
        id: 5,
      },
    ],
  },
  {
    text: '人文学院',
    children: [
      {
        text: '所有专业',
        id: 0,
      },
      {
        text: '法学',
        id: 1,
      },
      {
        text: '日语',
        id: 2,
      },
      {
        text: '英语',
        id: 3,
      },
    ],
  },
  {
    text: '数字媒体与设计艺术学院',
    children: [
      {
        text: '所有专业',
        id: 0,
      },
      {
        text: '数字媒体技术',
        id: 1,
      },
      {
        text: '数字媒体艺术',
        id: 2,
      },
      {
        text: '网络与新媒体',
        id: 3,
      },
      {
        text: '智能交互设计',
        id: 4,
      },
    ],
  },
  {
    text: '网络空间安全学院',
    children: [
      {
        text: '所有专业',
        id: 0,
      },
      {
        text: '密码科学与技术',
        id: 1,
      },
      {
        text: '网络空间安全',
        id: 2,
      },
      {
        text: '网络空间安全（大类招生）',
        id: 3,
      },
      {
        text: '信息安全',
        id: 4,
      },
    ],
  },
  {
    text: '未来学院',
    children: [
      {
        text: '所有专业',
        id: 0,
      },
      {
        text: '电子科学与技术',
        id: 1,
      },
      {
        text: '电子信息类（元班）',
        id: 2,
      },
      {
        text: '计算机科学与技术',
        id: 3,
      },
      {
        text: '计算机类（元班）',
        id: 4,
      },
      {
        text: '通信工程',
        id: 5,
      },
      {
        text: '网路空间安全',
        id: 6,
      },
    ],
  },
  {
    text: '现代邮政学院',
    children: [
      {
        text: '所有专业',
        id: 0,
      },
      {
        text: '电子商务',
        id: 1,
      },
      {
        text: '管理科学与工程类',
        id: 2,
      },
      {
        text: '机械工程',
        id: 3,
      },
      {
        text: '邮政工程',
        id: 4,
      },
      {
        text: '邮政管理',
        id: 5,
      },
      {
        text: '自动化类',
        id: 6,
      },
    ],
  },
  {
    text: '信息与通信工程学院',
    children: [
      {
        text: '所有专业',
        id: 0,
      },
      {
        text: '电子信息工程',
        id: 1,
      },
      {
        text: '空间信息与数字技术',
        id: 2,
      },
      {
        text: '通信工程',
        id: 3,
      },
      {
        text: '通信工程（大类招生）',
        id: 4,
      },
    ],
  },
]

// 书籍排序选项
export const SORT_TYPE_OPTION = [
  {
    text: '最新上架',
    value: 'create_time',
  },
  {
    text: '最多浏览',
    value: 'views',
  },
]

// 一次加载获取的书籍数量
export const BOOK_LIMIT_NUM = 20