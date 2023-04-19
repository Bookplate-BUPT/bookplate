// components/main-book-card/index.ts

Component({
  properties: {
    bookDB: Object,
  },

  data: {
    isNew: false,
  },

  observers: {
    bookDB: function (newBookDB) {
      this.setData({
        isNew: (new Date).getTime() - newBookDB.create_time < 86400000 * 2
      })
    }
  }
})
