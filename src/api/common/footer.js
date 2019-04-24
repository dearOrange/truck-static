import { POST } from '@/api'

// 添加足迹
export function addFooter(params) {
  return POST('ptUserView/savePtUserView.do', params)
}
