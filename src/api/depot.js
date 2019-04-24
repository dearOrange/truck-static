import { POST, GET } from '@/api'

function getList(params = {}, options = {}) {
  return POST('baStock/getListByExt.do', params, options)
}

// 详情
function getDetail(stockPublishUkid, options = {}) {
  return POST(
    'baStock/getByEchoDisplay.do',
    {
      stockPublishUkid
    },
    options
  )
}

// 特定仓库对象
function getDepot(stockPublishUkid) {
  return GET('baStock/getByExt.do', { stockPublishUkid })
}

//冷库精选
function getPopularList(total) {
  return GET('baStock/getListByStockSelected.do', { total })
}

//冷库需求推荐
function getRecommendList(total, cityCode, districtCode) {
  return POST('baStock/getListByPeriphery.do', {
    total,
    cityCode,
    districtCode
  })
}

// 增加意向（预约看库和回电联系我）
function addIntention(params = {}) {
  return POST('ptIntention/savePtIntention.do', params)
}

export default {
  getList,
  getDetail,
  getDepot,
  getPopularList,
  getRecommendList,

  addIntention
}
