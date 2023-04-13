// components/trade-location-picker/index.ts
import { TradeLocation } from "../../consts/index"

Component({
  properties: {
    tradeLocation: String,
  },

  data: {
    columns: TradeLocation,
    show: false,
  },

  methods: {
    onSelect() {
      this.setData({
        show: true
      })
    },

    onClose() {
      this.setData({
        show: false
      })
    },

    onConfirm(e: WechatMiniprogram.TouchEvent) {
      this.onClose()
      this.triggerEvent("change", e.detail.value)
    }
  }
})
