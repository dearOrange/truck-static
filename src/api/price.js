import { GET } from '@/api'

export function fetchPrice(params) {
  //平均价格
  return GET('ptStockPublish/getByPrice.do', params)
}
