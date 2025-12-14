import Login from '../page/Login'
import Article from '../page/Article'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../page/Layout'
import Board from '../page/Board'
import About from '../page/About'

const router = createBrowserRouter([
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
])

export default router