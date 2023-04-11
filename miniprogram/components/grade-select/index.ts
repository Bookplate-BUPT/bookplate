// components/grade-select/index.ts
Component({
  properties: {
    grade: String,
  },

  pageLifetimes: {
    show() {
      // 如果没有数据则附上初值
      if (!this.properties.grade) {
        this.setData({
          grade: this.data.columns[0]
        })
        this.triggerEvent("change", this.data.columns[0])
      }
    },
  },

  data: {
    columns: ['2022', '2021', '2020', '2019', '2018', '2017', '2016'],
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
