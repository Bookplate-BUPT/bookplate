// components/major-select/index.ts

const SchoolWithMajor = {
  "未来学院": ['电子信息类（元班）', '计算机类（元班）', '通信工程', '电子科学与技术', '计算机科学与技术', '网路空间安全'],
  "电子工程学院": ['电子信息类', '电子信息科学与技术', '电子科学与技术', '光电信息科学与工程'],
  "信息与通信工程学院": ['通信工程（大类招生）', '通信工程', '电子信息工程', '空间信息与数字技术'],
  "计算机学院": ['计算机类', '软件工程', '计算机科学与技术', '网络工程', '数据科学与大数据技术'],
  "网络空间安全学院": ['网络空间安全（大类招生）', '网络空间安全', '信息安全', '密码科学与技术'],
  "人工智能学院": ['人工智能（大类招生）', '信息工程', '人工智能', '自动化', '智能医学工程'],
  "现代邮政学院": ['自动化类', '管理科学与工程类', '机械工程', '邮政工程', '电子商务', '邮政管理'],
  "经济管理学院": ['大数据管理与应用金融科技', '工商管理类', '工商管理', '公共事业管理'],
  "理学院": ['理科试验班', '数学与应用数学', '信息与计算科学', '应用物理学'],
  "人文学院": ['英语', '日语', '法学'],
  "数字媒体与设计艺术学院": ['智能交互设计', '数字媒体技术', '数字媒体艺术', '网络与新媒体'],
  "国际学院": ['电信工程及管理', '物联网工程', '电子信息工程', '智能科学与技术'],
  "北京邮电大学玛丽女王海南学院": ['信息与计算科学'],
};

Component({
  properties: {
    school: String,
    major: String,
  },

  lifetimes: {
    attached() {
      let keyList = Object.keys(SchoolWithMajor)
      let schoolIdx = keyList.findIndex(i => i === this.properties.school)
      if (schoolIdx === -1) {
        this.triggerEvent("change", [keyList[0], SchoolWithMajor[keyList[0] as keyof typeof SchoolWithMajor][0]])
        return
      }

      let majorList = SchoolWithMajor[this.properties.school as keyof typeof SchoolWithMajor]
      let majorIdx = majorList.findIndex(i => i === this.properties.major)

      this.setData({
        ['columns[0].defaultIndex']: schoolIdx,
        ['columns[1].defaultIndex']: majorIdx === -1 ? 0 : majorIdx,
        ['columns[1].values']: majorList,
      })
    },
  },

  data: {
    columns: [
      {
        values: Object.keys(SchoolWithMajor),
        defaultIndex: 0,
      },
      {
        values: SchoolWithMajor['未来学院'],
        defaultIndex: 0,
      },
    ],
  },

  methods: {
    onChange(e: WechatMiniprogram.TouchEvent) {
      const { picker, value, index } = e.detail;

      if (index === 0) {
        let majorList = SchoolWithMajor[value[0] as keyof typeof SchoolWithMajor]
        picker.setColumnValues(1, majorList)

        // 修改第一列时，第二列的数据不会改变，为保证正确只能默认取第一位
        this.triggerEvent("change", [value[0], majorList[0]])
      } else {
        this.triggerEvent("change", value)
      }
    },
  }
})
