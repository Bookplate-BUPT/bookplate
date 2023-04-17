// 将图片上传到云存储
export const uploadImage = (cloudPath: string, filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    wx.cloud.uploadFile({
      // 云存储路径
      cloudPath: cloudPath,
      // 指定要上传的文件的小程序临时文件路径
      filePath: filePath
    }).then(res => {
      resolve(res.fileID)
    }).catch(reject)
  })
}

// 删除云存储的图片
export const deleteImage = (fileID: string | string[]): Promise<ICloud.DeleteFileResult> => {
  return new Promise((resolve, reject) => {
    wx.cloud.deleteFile({
      fileList: typeof fileID === 'string' ? [fileID] : fileID
    }).then(res => {
      resolve(res)
    }).catch(reject)
  })
}
