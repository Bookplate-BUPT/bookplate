// components/book-type-menu/index.ts
import { BOOK_TYPE_OPTION, SORT_TYPE_OPTION } from "../../consts/index";

Component({
  properties: {
    schoolType: String,
    sortType: String,
  },

  data: {
    bookTypeOption: BOOK_TYPE_OPTION,
    sortTypeOption: SORT_TYPE_OPTION,

    schoolIndex: 0, // 默认的学院选项索引
    majorIndex: -1, // 默认的专业选项索引
  },

  methods: {
    onChangeSort(e: WechatMiniprogram.TouchEvent) {
      this.setData({
        sortType: e.detail as unknown as string
      })
      this.triggerEvent('changeSort', e.detail)
    },

    onChangeSchool(e: WechatMiniprogram.TouchEvent) {
      this.setData({
        schoolIndex: e.detail.index || 0,
        majorIndex: -1,
      })

      // 当学院为“全部书籍”或“所有学院”时不需要额外选择专业
      let school = BOOK_TYPE_OPTION[e.detail.index].text
      if (school === '全部书籍') {
        this.selectComponent('#book-type-menu').toggle(false)
        this.triggerEvent('changeType', ['全部书籍', ''])
      } else if (school === '所有学院') {
        this.selectComponent('#book-type-menu').toggle(false)
        this.triggerEvent('changeType', ['所有学院', '所有专业'])
      }
    },

    onChangeMajor(e: WechatMiniprogram.TouchEvent) {
      this.setData({
        majorIndex: e.detail.id === undefined ? -1 : e.detail.id
      })

      this.selectComponent('#book-type-menu').toggle(false)
      this.triggerEvent('changeType', [BOOK_TYPE_OPTION[this.data.schoolIndex].text, e.detail.text])
    },
  }
})
