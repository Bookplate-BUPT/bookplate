// 默认头像
export const DEFAULT_AVATAR_URL: string = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

// 书籍适用的学院和专业
export const BookSchoolWithMajor = {
  '所有学院': ['所有专业'],
  '未来学院': ['所有专业', '电子信息类（元班）', '计算机类（元班）', '通信工程', '电子科学与技术', '计算机科学与技术', '网路空间安全'],
  '电子工程学院': ['所有专业', '电子信息类', '电子信息科学与技术', '电子科学与技术', '光电信息科学与工程',],
  '计算机学院': ['所有专业', '计算机类', '软件工程', '计算机科学与技术', '网络工程', '数据科学与大数据技术'],
  '信息与通信工程学院': ['所有专业', '通信工程（大类招生）', '通信工程', '电子信息工程', '空间信息与数字技术'],
  '网络空间安全学院': ['所有专业', '网络空间安全（大类招生）', '网络空间安全', '信息安全', '密码科学与技术'],
  '人工智能学院': ['所有专业', '人工智能（大类招生）', '信息工程', '人工智能', '自动化', '智能医学工程'],
  '现代邮政学院': ['所有专业', '自动化类', '管理科学与工程类', '机械工程', '邮政工程', '电子商务', '邮政管理'],
  '经济管理学院': ['所有专业', '大数据管理与应用金融科技', '工商管理类', '工商管理', '公共事业管理'],
  '理学院': ['所有专业', '理科试验班', '数学与应用数学', '信息与计算科学', '应用物理学'],
  '人文学院': ['所有专业', '英语', '日语', '法学'],
  '数字媒体与设计艺术学院': ['所有专业', '智能交互设计', '数字媒体技术', '数字媒体艺术', '网络与新媒体'],
  '国际学院': ['所有专业', '电信工程及管理', '物联网工程', '电子信息工程', '智能科学与技术'],
  '北京邮电大学玛丽女王海南学院': ['所有专业', '信息与计算科学']
}

// 入学年份
export const Grade = ['2022', '2021', '2020', '2019', '2018', '2017', '2016']

// 用户的学院和专业
export const SchoolWithMajor = {
  '未来学院': ['电子信息类（元班）', '计算机类（元班）', '通信工程', '电子科学与技术', '计算机科学与技术', '网路空间安全'],
  '电子工程学院': ['电子信息类', '电子信息科学与技术', '电子科学与技术', '光电信息科学与工程'],
  '信息与通信工程学院': ['通信工程（大类招生）', '通信工程', '电子信息工程', '空间信息与数字技术'],
  '计算机学院': ['计算机类', '软件工程', '计算机科学与技术', '网络工程', '数据科学与大数据技术'],
  '网络空间安全学院': ['网络空间安全（大类招生）', '网络空间安全', '信息安全', '密码科学与技术'],
  '人工智能学院': ['人工智能（大类招生）', '信息工程', '人工智能', '自动化', '智能医学工程'],
  '现代邮政学院': ['自动化类', '管理科学与工程类', '机械工程', '邮政工程', '电子商务', '邮政管理'],
  '经济管理学院': ['大数据管理与应用金融科技', '工商管理类', '工商管理', '公共事业管理'],
  '理学院': ['理科试验班', '数学与应用数学', '信息与计算科学', '应用物理学'],
  '人文学院': ['英语', '日语', '法学'],
  '数字媒体与设计艺术学院': ['智能交互设计', '数字媒体技术', '数字媒体艺术', '网络与新媒体'],
  '国际学院': ['电信工程及管理', '物联网工程', '电子信息工程', '智能科学与技术'],
  '北京邮电大学玛丽女王海南学院': ['信息与计算科学'],
}

// 用户角色
export const Role = ['游客', '北邮人']

// 交易校区
export const TradeLocation = ['沙河校区', '西土城校区', '沙河或西土城校区']