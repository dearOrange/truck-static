import { POST } from '@/api'

function storeRent(params) {
  //增加发布冷库出租
  return POST('baStock/saveStockObject.do', params, {
    json: true
  })
}

function storeSaveDrafts(params) {
  //增加发布冷库出租（保存草稿）
  return POST('baStock/saveByUnpublished.do', params, {
    json: true
  })
}

function storeDemandRent(params) {
  //增加冷库求租
  return POST('ptStockDemand/savePtStockDemand.do', params)
}

function demandSaveDrafts(params) {
  //增加冷库求租（保存草稿）
  return POST('ptStockDemand/saveByUnpublished.do', params)
}

function updateDepot(params) {
  return POST('baStock/updateStockObject.do', params, {
    json: true
  })
}

function updateRent(params) {
  return POST('ptStockDemand/updatePtStockDemand.do', params)
}

export default {
  storeRent,
  storeSaveDrafts,
  storeDemandRent,
  demandSaveDrafts,

  updateDepot,
  updateRent
}
