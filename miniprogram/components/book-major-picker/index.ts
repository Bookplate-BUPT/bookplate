// components/book-major-picker/index.ts
import { getLocalUser } from "../../services/users";
import { BookSchoolWithMajor } from "../../consts/index";

Component({
  properties: {
    school: String,
    major: String,
  },

  lifetimes: {
    attached() {
      let user = getLocalUser()
      this.triggerEvent("change", [user.school, user.major])
    }
  },

  data: {
    columns: [
      {
        values: Object.keys(BookSchoolWithMajor),
      },
      {
        values: BookSchoolWithMajor[Object.keys(BookSchoolWithMajor)[0] as keyof typeof BookSchoolWithMajor],
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
        let majorList = BookSchoolWithMajor[value[0] as keyof typeof BookSchoolWithMajor]
        picker.setColumnValues(1, majorList)
      }
    },

    onConfirm(e: WechatMiniprogram.TouchEvent) {
      this.onClose()
      this.triggerEvent("change", e.detail.value)
    }
  }
})
