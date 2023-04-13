import { Book, BookDB, DBAddResult, DocumentId } from "../types/index"

// 通过 _id 获取书籍
// 数据库权限中默认的“所有用户可读，仅创建者可读写”
// 这并不支持所有用户用 doc(_id) 读，故需要设置自定义权限
// 具体原因见 https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/security-rules.html
export const getBookById = (docId: DocumentId): Promise<BookDB> => {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('books')
      .doc(docId)
      .get()
      .then(res => {
        resolve(res.data as BookDB)
      })
      .catch(reject)
  })
}

// 添加书籍
export const addBook = (book: Book): Promise<DBAddResult> => {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('books')
      .add({
        data: book
      })
      .then(res => {
        resolve(res as DBAddResult)
      })
      .catch(reject)
  })
}

// 通过 ISBN 查询详细书籍信息
export const searchBookByISBN = (isbn: string): Promise<Book> => {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'bookplateFunctions',
      data: {
        type: 'searchBookByISBN',
        isbn: isbn,
      }
    }).then(res => {
      resolve(res.result as Book)
    }).catch(reject)
  })
}

// 获取书籍列表
export const getBookList = (): Promise<BookDB[]> => {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('books')
      .get()
      .then(res => {
        resolve(res.data as BookDB[])
      })
      .catch(reject)
  })
}