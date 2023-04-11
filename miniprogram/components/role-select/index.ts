// components/role-select/index.ts

Component({
  properties: {
    role: String
  },

  pageLifetimes: {
    show() {
      // 如果没有数据则附上初值
      if (!this.properties.role) {
        this.setData({
          role: this.data.columns[0],
        })
        this.triggerEvent("change", this.data.columns[0])
      }
    },
  },

  data: {
    columns: ['北邮人', '游客'],
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
