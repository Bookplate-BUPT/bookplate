import { Book, BookDB, DocumentId } from "../types/index"

// 通过 _id 获取书籍
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
export const addBook = (book: Book): Promise<DB.IAddResult> => {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('books')
      .add({
        data: book
      })
      .then(res => {
        resolve(res as DB.IAddResult)
      })
      .catch(reject)
  })
}

// 更新书籍
export const updateBookById = (book: Book, docId: DocumentId): Promise<DB.IUpdateResult> => {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('books')
      .doc(docId)
      .update({
        data: book
      })
      .then(res => {
        resolve(res as DB.IUpdateResult)
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