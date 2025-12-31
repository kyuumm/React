import { request } from "@/utils";


// The new version returns a promise,
// which can be used to handle the response or error.

//获取频道列表
export function getChannelAPI() {
  return request({
    url: '/channels',
    method: "GET",
  })
}
//提交文章表单
export function createArticleAPI(data) {
  return request({
    url: 'mp/articles',
    method: "POST",
    data: data,
  })
}
