// components/role-select/index.ts

Component({
  properties: {
    role: String
  },

  lifetimes: {
    attached() {
      if (!this.properties.role) {
        this.triggerEvent("change", this.data.columns[this.data.defaultIndex])
        return
      }

      let idx = this.data.columns.findIndex(i => i === this.properties.role)

      this.setData({
        defaultIndex: idx,
        role: this.data.columns[idx],
      })
    },
  },

  data: {
    columns: ['北邮人', '游客'],
    show: false,
    defaultIndex: 0,
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
