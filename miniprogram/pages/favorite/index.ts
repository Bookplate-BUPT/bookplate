// pages/favorite/index.ts
import { FaVoriteAggregateResult } from "../../types/index";
import { BOOK_LIMIT_NUM } from "../../consts/index";
import { getFavoriteList } from "../../services/favorite";
import { getLocalUserOpenId } from "../../services/users";
import { isEqual } from "../../utils/utils";

Page({
  data: {
    bookList: [] as FaVoriteAggregateResult[],

    // 显示相关
    isOnReachBottom: false,   // 是否正在触底加载
    isNoMore: false,          // 是否后续还有书籍
  },

  async onLoad() {
    this.setData({
      bookList: await getFavoriteList(getLocalUserOpenId(), BOOK_LIMIT_NUM, 0)
    })
  },

  async onShow() {
    // 每当页面显示时，为保证收藏信息正确，需要重发请求，并比对两者数据
    let res = await getFavoriteList(getLocalUserOpenId(), BOOK_LIMIT_NUM, 0)

    // 如果数据发生了改变，则需要重新获取整个列表
    if (!isEqual(this.data.bookList.slice(0, res.length + 1), res)) {
      wx.showLoading({
        title: '正在加载'
      })

      let favoriteListLength = this.data.bookList.length < BOOK_LIMIT_NUM ? BOOK_LIMIT_NUM : this.data.bookList.length

      this.setData({
        bookList: await getFavoriteList(getLocalUserOpenId(), favoriteListLength, 0)
      })

      wx.hideLoading()
    }
  },

  // 滑动触底时触发
  onReachBottom() {
    if (this.data.isOnReachBottom || this.data.isNoMore) return

    // 用于节流判断，当前正在触底加载新数据时，再次触底不重复加载
    this.setData({
      isOnReachBottom: true
    })

    wx.showLoading({
      title: '正在加载'
    })

    getFavoriteList(getLocalUserOpenId(), BOOK_LIMIT_NUM, this.data.bookList.length).then(res => {
      wx.hideLoading()

      this.setData({
        bookList: this.data.bookList.concat(res),
        isNoMore: res.length < BOOK_LIMIT_NUM,  // 获取的数量若不足够，说明后续已经没有书籍了
        isOnReachBottom: false,
      })
    })
  },

  // 前往书籍详情页
  toBookDetail(e: WechatMiniprogram.TouchEvent) {
    wx.navigateTo({
      url: `../bookDetail/index?bookDB=${encodeURIComponent(JSON.stringify(e.currentTarget.dataset.book))}`,
    })
  },
})