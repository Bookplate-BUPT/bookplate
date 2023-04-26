// components/major-picker/index.ts
import { SCHOOL_WITH_MAJOR } from "../../consts/index"

Component({
  properties: {
    school: String,
    major: String,
  },

  observers: {
    'school, major': function () {
      // 如果没有数据则附上初值
      if (!this.properties.school) {
        let keyList = Object.keys(SCHOOL_WITH_MAJOR)
        this.triggerEvent("change", [keyList[0], SCHOOL_WITH_MAJOR[keyList[0] as keyof typeof SCHOOL_WITH_MAJOR][0]])
      }
    },
  },

  data: {
    columns: [
      {
        values: Object.keys(SCHOOL_WITH_MAJOR),
      },
      {
        values: SCHOOL_WITH_MAJOR[Object.keys(SCHOOL_WITH_MAJOR)[0] as keyof typeof SCHOOL_WITH_MAJOR],
      },
    ],
    show: false,
  },

  methods: {
    onSelect() {
      this.setData({
        show: true
      })
    },

    onClose() {
      this.setData({
        show: false
      })
    },

    onChange(e: WechatMiniprogram.TouchEvent) {
      const { picker, value, index } = e.detail;

      // 修改第一列时，改变第二列的数据
      if (index === 0) {
        let majorList = SCHOOL_WITH_MAJOR[value[0] as keyof typeof SCHOOL_WITH_MAJOR]
        picker.setColumnValues(1, majorList)
      }
    },

    onConfirm(e: WechatMiniprogram.TouchEvent) {
      this.onClose()
      this.triggerEvent("change", e.detail.value)
    }
  }
})
