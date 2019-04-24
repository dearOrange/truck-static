import { GET } from '@/api'

// 详情
function getDetail(stockDemandUkid, options = {}) {
  return GET(
    'ptStockDemand/getById.do',
    {
      stockDemandUkid
    },
    options
  )
}

export default {
  getDetail
}
