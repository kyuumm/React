//创建路由实例，绑定path和element
import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/Layout";
import Month from "@/pages/Month";
import Year from "@/pages/Year";
import New from "@/pages/New";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        // index: true,
        //index：特殊的路由配置，表示这是2路由的默认子路由
        // 当使用 index: true 时，不需要指定 path，因为它会自动匹配2路由的路径
        path: 'month',
        element: <Month />,
      },
      {
        path: 'year',
        element: <Year />
      },
    ]
  },
  {
    path: '/new',
    element: <New />
  },

])

export default router