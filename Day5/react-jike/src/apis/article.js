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
//更新文章表单
export function updateArticleAPI(data) {
  return request({
    url: `mp/articles/${data.id}`,
    method: "PUT",
    data: data,
  })

}

//获取文章列表
export function getArticleListAPI(params) {
  return request({
    url: 'mp/articles',
    method: "GET",
    params
  })
}

export function delArticleAPI(id) {
  return request({
    url: `mp/articles/${id}`,
    method: "DELETE",
  })
}

export function getArticleById(id) {
  return request({
    url: `mp/articles/${id}`,
    method: "GET",
  })
}

