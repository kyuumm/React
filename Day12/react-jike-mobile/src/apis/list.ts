import { http } from '@/utils/index'
import type { ResType } from '@/apis/shared'
//泛型
// type ResType<T> = {
//   message: string,
//   data: T
// }

//具体
export type ChannelItem = {
  id: number,
  name: string
}

type ChannelRes = {
  channels: ChannelItem[]
}

//组合

function fetchChannelAPI() {
  return http.request<ResType<ChannelRes>>({
    url: '/v1_0/channels',
  })
}



//请求文章列表

type ListItem = {
  art_id: string,
  title: string,
  aut_id: string,
  comm_count: number,
  pubdate: string,
  aut_name: string,
  is_top: number,
  cover: {
    type: number
    images: string
  }
}

export type ListRes = {
  results: ListItem[],
  pre_timestamp: string
}

type ReqParams = {
  channel_id: string,
  timestamp: string
}
function fetchListAPI(params: ReqParams) {
  return http.request<ResType<ListRes>>({
    url: '/v1_0/articles',
    params: params,
  })
}

export { fetchChannelAPI, fetchListAPI }