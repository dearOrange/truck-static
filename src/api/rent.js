import { POST, GET } from '@/api'

// 列表
function getList(params = {}, options = {}) {
  return POST('ptStockDemand/getListByExt.do', params, options)
}

// 详情
function getDetail(stockDemandUkid, options = {}) {
  return GET(
    'ptStockDemand/getByDisplay.do',
    {
      stockDemandUkid
    },
    options
  )
}

//冷库求租精选
function getPopularList(total, cityCode) {
  return POST('ptStockDemand/getListBySelected.do', { total, cityCode })
}

//冷库需求推荐
function getRecommendList(total, cityCode) {
  return POST('ptStockDemand/getListByRecommend.do', { total, cityCode })
}

export default {
  getList,
  getDetail,
  getRecommendList,
  getPopularList
}
