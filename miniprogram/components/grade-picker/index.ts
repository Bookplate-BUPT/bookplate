// components/grade-picker/index.ts
import { GRADE } from "../../consts/index"

Component({
  properties: {
    grade: String,
  },

  observers: {
    grade: function () {
      // 如果没有数据则附上初值
      if (!this.properties.grade) {
        this.triggerEvent("change", GRADE[0])
      }
    }
  },

  data: {
    columns: GRADE,
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

    onConfirm(e: WechatMiniprogram.TouchEvent) {
      this.setData({
        grade: e.detail.value,
        show: false,
      })

      this.triggerEvent("change", this.data.grade)
    },
  }
})
