import { convertDateToTimestamp, convertTimestampToDate, hasBookProperties } from "../utils/utils"
import { Book, BookDB, DocumentID } from "../types/index"
import { BOOK_LIMIT_NUM } from "../consts/index"

// 通过 _id 获取书籍
export const getBookByID = (id: DocumentID): Promise<BookDB> => {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('books')
      .doc(id)
      .get()
      .then(res => {
        resolve(convertDateToTimestamp(res.data) as BookDB)
      })
      .catch(reject)
  })
}

// 添加书籍
export const addBook = (book: Book): Promise<DB.IAddResult> => {
  if (!hasBookProperties(book)) return Promise.reject(new Error('缺少书籍属性'))

  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('books')
      .add({
        data: book
      })
      .then(res => {
        resolve(res)
      })
      .catch(reject)
  })
}

// 更新书籍
export const updateBookByID = (book: Book, id: DocumentID): Promise<DB.IUpdateResult> => {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('books')
      .doc(id)
      .update({
        data: convertTimestampToDate(book)
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
        resolve(convertDateToTimestamp(res.data) as BookDB[])
      })
      .catch(reject)
  })
}

// 按照某一列的排序获取固定数目的书籍列表
export const getSortedBookList = (
  fieldPath?: string,             // 排序字段
  order?: string,                 // 升序降序
  limit?: number,                 // 获取数目
  skip?: number,                  // 选择跳过数目
  condition?: DB.IQueryCondition  // 筛选条件
): Promise<BookDB[]> => {
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection('books')
      .where(condition ? condition : {})
      .orderBy(fieldPath ? fieldPath : 'create_time', order ? order : 'desc')
      .skip(skip ? skip : 0)
      .limit(limit ? limit : BOOK_LIMIT_NUM)
      .get()
      .then(res => {
        resolve(convertDateToTimestamp(res.data) as BookDB[])
      })
      .catch(reject)
  })
}