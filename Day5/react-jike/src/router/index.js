//路由配置
import Layout from "@/pages/Layout";// src/pages/layout
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";
// import Home from '@/pages/Home'
// import Article from '@/pages/Article'
// import Publish from '@/pages/Publish'

import { lazy, Suspense } from "react";
//lazy导入组件
const Home = lazy(() => import('@/pages/Home'))
const Article = lazy(() => import('@/pages/Article'))
const Publish = lazy(() => import('@/pages/Publish'))


//配置路由实例
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute><Layout /></AuthRoute>,
    children: [
      {
        index: 'true',
        element: <Home />
      },
      {
        path: 'home',
        element: <Suspense fallback={'loading...'}><Home /></Suspense>
      },
      {
        path: 'article',
        element: <Suspense fallback={'loading...'}><Article /></Suspense>
      },
      {
        path: 'publish',
        element: <Suspense fallback={'loading...'}><Publish /></Suspense>
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
])


export default router