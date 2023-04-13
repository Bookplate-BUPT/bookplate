// components/role-picker/index.ts
import { Role } from "../../consts/index"

Component({
  properties: {
    role: String
  },

  observers: {
    role: function () {
      if (!this.properties.role) {
        this.triggerEvent("change", Role[0])
      }
    }
  },

  data: {
    columns: Role,
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
        role: e.detail.value,
        show: false,
      })

      this.triggerEvent("change", this.data.role)
    },
  }
})
