import { request } from "@/utils";

export function loginAPI(formData) {
  return request({
    url: '/authorizations',
    method: "POST",
    data: formData
  })
}

// The new version returns a promise,
// which can be used to handle the response or error.

//获取用户信息
export function getProfileAPI() {
  return request({
    url: '/user/profile',
    method: "GET",
  })
}
