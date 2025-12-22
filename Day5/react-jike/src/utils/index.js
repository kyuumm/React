//统一中转工具模块函数
// import {request} from '@/utils'
import { request } from './request'

export {
  request
}
//统一导入导出
//为什么？
//index.js 的作用
//它是“统一导出”的入口（barrel）。
// 加了它之后，你可以写 import { request } from '@/utils'，
// 而不必写 import { request } from '@/utils/request'。
//因为当你引入一个目录时，模块系统会默认找该目录下的 index.js 作为入口。