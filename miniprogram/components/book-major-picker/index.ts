// components/book-major-picker/index.ts
import { BOOK_SCHOOL_WITH_MAJOR } from "../../consts/index";

Component({
  properties: {
    school: String,
    major: String,
  },

  data: {
    columns: [
      {
        values: Object.keys(BOOK_SCHOOL_WITH_MAJOR),
      },
      {
        values: BOOK_SCHOOL_WITH_MAJOR[Object.keys(BOOK_SCHOOL_WITH_MAJOR)[0] as keyof typeof BOOK_SCHOOL_WITH_MAJOR],
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
        let majorList = BOOK_SCHOOL_WITH_MAJOR[value[0] as keyof typeof BOOK_SCHOOL_WITH_MAJOR]
        picker.setColumnValues(1, majorList)
      }
    },

    onConfirm(e: WechatMiniprogram.TouchEvent) {
      this.onClose()
      this.triggerEvent("change", e.detail.value)
    }
  }
})
