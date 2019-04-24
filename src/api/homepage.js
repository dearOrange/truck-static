import { GET, POST } from '@/api'

function newStock(total) {
  //新库推荐
  return POST('baStock/getListByNewStock.do', { total })
}

function stockPopular(total) {
  //热租冷库
  return GET('baStock/getListByStockPopular.do', { total })
}

function byPeriphery(total, cityCode, districtCode) {
  //冷库需求推荐
  return POST('baStock/getListByPeriphery.do', {
    total,
    cityCode,
    districtCode
  })
}

function getHomeData(params) {
  //冷库需求推荐
  return POST('baStock/getHomeData.do', params)
}

export default {
  newStock,
  stockPopular,
  byPeriphery,
  getHomeData
}
