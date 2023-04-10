// components/grade-select/index.ts
Component({
  properties: {
    grade: String,
  },

  lifetimes: {
    attached() {
      if (!this.properties.grade) {
        this.triggerEvent("change", this.data.columns[this.data.defaultIndex])
        return
      }

      let idx = this.data.columns.findIndex(i => i === this.properties.grade)
      this.setData({
        defaultIndex: idx,
        grade: this.data.columns[idx],
      })
    },
  },

  data: {
    columns: ['2022', '2021', '2020', '2019', '2018', '2017', '2016'],
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
        grade: e.detail.value,
        show: false,
      })

      this.triggerEvent("change", this.data.grade)
    },
  }
})
