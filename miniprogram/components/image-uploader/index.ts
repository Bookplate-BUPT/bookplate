// components/image-uploader/index.ts
interface VantImageFile {
  url: string
  isImage: boolean
  deletable?: boolean
}

Component({
  properties: {
    images: Array
  },

  observers: {
    images: function (newImages: string[]) {
      let imagesOnShow = newImages.map(i => {
        return {
          url: i,
          isImage: true,
          deletable: true,
        } as VantImageFile
      })

      this.setData({
        imagesOnShow: imagesOnShow,
      })
    }
  },

  data: {
    imagesOnShow: [] as VantImageFile[]
  },

  methods: {
    onAdd(e: WechatMiniprogram.TouchEvent) {
      e.detail.file.forEach((i: { url: string }) => {
        this.properties.images.push(i.url)
      })

      this.setData({
        images: this.properties.images,
      })

      this.triggerEvent("change", this.data.images)
    },

    onDelete(e: WechatMiniprogram.TouchEvent) {
      this.properties.images.splice(e.detail.index, 1)

      this.setData({
        images: this.properties.images,
      })

      this.triggerEvent("change", this.data.images)
    },
  }
})
