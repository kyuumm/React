import Login from '../page/Login'
import Article from '../page/Article'
import Layout from '../page/Layout'
import Board from '../page/Board'
import About from '../page/About'
import NotFound from '../page/NotFound'
import { createBrowserRouter, createHashRouter } from 'react-router-dom'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        // path: 'board',
        index: true,
        element: <Board />
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  },


  {
    path: '/login/:id2/:name2',
    element: <Login />
    // Login组件的JSX语法表示
  },
  {
    path: '/article',
    element: <Article />
  },




  {
    path: '*',
    element: <NotFound />
  },

])

export default router