// components/major-picker/index.ts
import { SchoolWithMajor } from "../../consts/index"

Component({
  properties: {
    school: String,
    major: String,
  },

  observers: {
    'school, major': function () {
      // 如果没有数据则附上初值
      if (!this.properties.school) {
        let keyList = Object.keys(SchoolWithMajor)
        this.triggerEvent("change", [keyList[0], SchoolWithMajor[keyList[0] as keyof typeof SchoolWithMajor][0]])
      }
    },
  },

  data: {
    columns: [
      {
        values: Object.keys(SchoolWithMajor),
      },
      {
        values: SchoolWithMajor[Object.keys(SchoolWithMajor)[0] as keyof typeof SchoolWithMajor],
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
        let majorList = SchoolWithMajor[value[0] as keyof typeof SchoolWithMajor]
        picker.setColumnValues(1, majorList)
      }
    },

    onConfirm(e: WechatMiniprogram.TouchEvent) {
      this.onClose()
      this.triggerEvent("change", e.detail.value)
    }
  }
})
