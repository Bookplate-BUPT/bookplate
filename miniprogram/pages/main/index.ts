// pages/main/index.ts
import { getLocalUserOpenid, isLogin } from "../../services/users"
import { getSortedBookList } from "../../services/books"
import { BookDB, FavoriteDB } from "../../types/index"
import { addFavorite, getFavoriteByBookID } from "../../services/favorite"
import { BOOK_LIMIT_NUM, BOOK_TYPE_OPTION, SORT_TYPE_OPTION } from "../../consts/index";

Page({
  data: {
    bookList: [] as BookDB[],

    // 筛选条件
    schoolType: BOOK_TYPE_OPTION[0].text,
    majorType: BOOK_TYPE_OPTION[0].children ? BOOK_TYPE_OPTION[0].children[0].text : '',
    sortType: SORT_TYPE_OPTION[0].value,
    condition: {},                // 数据库筛选条件

    // 显示相关
    scrollViewHeight: 0,          // 书籍列表元素应该有的长度
    isOnPullDownRefresh: false,   // 是否正在下拉刷新，用于取消下拉刷新动画
    isOnReachBottom: false,       // 是否正在触底加载，用于节流判断
    isNoMore: false,              // 是否后续还有书籍
  },

  onLoad() {
    this.setScrollViewHeight()

    // 按照默认的排序获取书籍
    getSortedBookList('create_time', 'desc', BOOK_LIMIT_NUM, 0, { state: 0 }).then(res => {
      this.setData({
        bookList: res,
        isNoMore: res.length < BOOK_LIMIT_NUM,
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
    // 未登录时不能收藏
    if (!isLogin()) {
      wx.showToast({
        title: '请先登录',
        icon: 'error'
      })
      return
    }

    // 无法收藏自己的书籍
    if (e.currentTarget.dataset.book._openid === getLocalUserOpenid()) {
      wx.showToast({
        title: '无法收藏自己的书籍',
        icon: 'none'
      })
      return
    }

    let favoriteDB = await getFavoriteByBookID(getLocalUserOpenid(), e.currentTarget.dataset.book._id)

    // 无法重复收藏
    if (favoriteDB) {
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

    // 改变排序条件了，一切重新获取，故 skip 0
    getSortedBookList(this.data.sortType, 'desc', BOOK_LIMIT_NUM, 0, this.data.condition).then(res => {
      this.setData({
        bookList: res,
        isNoMore: res.length < BOOK_LIMIT_NUM,  // 获取的数量若不足够，说明后续已经没有书籍了
      })
    })
  },

  // 书籍筛选条件改变时调用
  onChangeType(e: WechatMiniprogram.TouchEvent) {
    // 根据学院和专业生成数据库筛选条件
    let condition = e.detail[0] === '全部书籍' ? { state: 0 } : {
      school: e.detail[0],
      major: e.detail[1] === '所有专业' ? undefined : e.detail[1],
      state: 0,   // 未售出的书籍状态
    }

    this.setData({
      schoolType: e.detail[0],
      majorType: e.detail[1],
      condition: condition,
    })

    // 改变筛选条件了，一切重新获取，故 skip 0
    getSortedBookList(this.data.sortType, 'desc', BOOK_LIMIT_NUM, 0, this.data.condition).then(res => {
      this.setData({
        bookList: res,
        isNoMore: res.length < BOOK_LIMIT_NUM,  // 获取的数量若不足够，说明后续已经没有书籍了
      })
    })
  },

  // 下拉刷新时触发
  onPullDownRefresh() {
    wx.showLoading({
      title: '正在刷新'
    })

    // 下拉刷新时重新获取，skip 设 0
    getSortedBookList(this.data.sortType, 'desc', BOOK_LIMIT_NUM, 0, this.data.condition).then(res => {
      wx.hideLoading()

      this.setData({
        bookList: res,
        isNoMore: res.length < BOOK_LIMIT_NUM,
        isOnPullDownRefresh: false,
      })
    })
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

    // 获取当前筛选条件下后续的书籍
    getSortedBookList(this.data.sortType, 'desc', BOOK_LIMIT_NUM, this.data.bookList.length, this.data.condition).then(res => {
      wx.hideLoading()

      this.setData({
        bookList: this.data.bookList.concat(res),
        isNoMore: res.length < BOOK_LIMIT_NUM,  // 获取的数量若不足够，说明后续已经没有书籍了
        isOnReachBottom: false,
      })
    })
  },

  // 搜索时触发
  onSearch(e: WechatMiniprogram.TouchEvent) {
    if (e.type === 'search' && !e.detail) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'error',
      })
      return
    }

    // 关键字搜索
    if (e.type === 'search') {
      wx.navigateTo({
        url: `../searchResult/index?keyword=${e.detail}`
      })
    }

    // isbn 搜索
    if (e.type === 'tap') {
      wx.scanCode({
        onlyFromCamera: false,
        scanType: ['barCode'],
      }).then(res => {
        wx.navigateTo({
          url: `../searchResult/index?isbn=${res.result}`
        })
      }).catch(() => {
        wx.showToast({
          title: '识别失败',
          icon: 'error',
        })
      })
    }
  },
})