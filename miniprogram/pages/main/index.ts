// pages/main/index.ts
import { getLocalUserOpenId } from "../../services/users"
import { getSortedBookList } from "../../services/books"
import { BookDB, FavoriteDB } from "../../types/index"
import { addFavorite, isFavorite } from "../../services/favorite"
import { BookTypeOption, SortTypeOption } from "../../consts/index";

Page({
  data: {
    bookList: [] as BookDB[],

    // 显示相关
    scrollViewHeight: 0,

    schoolType: BookTypeOption[0].text,
    sortType: SortTypeOption[0].value,
  },

  onLoad() {
    this.setScrollViewHeight()

    getSortedBookList('create_time').then(res => {
      this.setData({
        bookList: res,
      })
    })
  },

  // 前往书籍详情页
  toBookDetail(e: WechatMiniprogram.TouchEvent) {
    wx.navigateTo({
      url: `../bookDetail/index?bookDB=${encodeURIComponent(JSON.stringify(e.currentTarget.dataset.book))}`,
    })
  },

  // 点击收藏按钮触发
  async onFavorite(e: WechatMiniprogram.TouchEvent) {
    // 无法收藏自己的书籍
    if (e.currentTarget.dataset.book._openid === getLocalUserOpenId()) {
      wx.showToast({
        title: '无法收藏自己的书籍',
        icon: 'none'
      })
      return
    }

    // 无法重复收藏
    if (await isFavorite(e.currentTarget.dataset.book._id)) {
      wx.showToast({
        title: '已在收藏列表中',
        icon: 'none'
      })
      return
    }

    let favorite = {
      book_id: e.currentTarget.dataset.book._id
    } as FavoriteDB

    addFavorite(favorite).then(() => {
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
      })
    })
  },

  // 设置书籍列表滚动可视区域的高度
  setScrollViewHeight() {
    this.setData({
      scrollViewHeight: wx.getWindowInfo().windowHeight - 140
    })
  },

  // 书籍排序条件改变时调用
  onChangeSort(e: WechatMiniprogram.TouchEvent) {
    this.setData({
      sortType: e.detail as unknown as string
    })
  },

  // 书籍筛选条件改变时调用
  onChangeType(e: WechatMiniprogram.TouchEvent) {
    console.log(e.detail)
    this.setData({
      schoolType: e.detail[0]
    })
  },
})