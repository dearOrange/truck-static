import { POST, GET } from '@/api'

function deleteRent(stockDemandUkid) {
  return POST('ptStockDemand/deletePtStockDemand.do', { stockDemandUkid })
}

function deleteDepot(stockPublishUkid) {
  return POST('ptStockPublish/deleteStockPublish.do', { stockPublishUkid })
}

function deleteRents(stockDemandUkids) {
  return POST('ptStockDemand/batchDelete.do', { stockDemandUkids })
}

function deleteDepots(ukids) {
  return POST('ptStockPublish/batchDelete.do', { ukids })
}

function refreshRent(stockDemandUkid) {
  return POST('ptStockDemand/updateByTime.do', { stockDemandUkid })
}

function refreshDepot(stockPublishUkid) {
  return POST('ptStockPublish/updateByTime.do', { stockPublishUkid })
}

function refreshRents(stockDemandUkids) {
  return POST('ptStockDemand/batchUpdateByTime.do', { stockDemandUkids })
}

function refreshDepots(stockPublishUkids) {
  return POST('ptStockPublish/batchUpdateByTime.do', { stockPublishUkids })
}

function getInvalidDepotList(params) {
  return POST('baStock/getListByInvalid.do', params)
}

function getUnpublishList(params) {
  return POST('baStock/getListByUnpublished.do', params)
}

function getRentList(params) {
  return POST('ptStockDemand/getListByRelease.do', params)
}

function getDepotList(params) {
  return POST('baStock/getListByRelease.do', params)
}

function getReleaseStatistics(params) {
  return GET('ptStockPublish/getDataObject.do', params)
}

export default {
  getReleaseStatistics,
  getInvalidDepotList,
  getUnpublishList,
  getRentList,
  getDepotList,
  deleteRent,
  deleteRents,
  deleteDepot,
  deleteDepots,

  refreshRent,
  refreshDepot,
  refreshRents,
  refreshDepots
}
