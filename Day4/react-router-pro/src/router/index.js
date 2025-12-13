import Login from '../page/Login'
import Article from '../page/Article'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/login/:id2/:name2',
    element: <Login />
    // Login组件的JSX语法表示
  },
  {
    path: '/Article',
    element: <Article />
  },
])

export default router