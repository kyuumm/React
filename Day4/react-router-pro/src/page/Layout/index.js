import { Link, Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div>
      this is first layout element

      <Link to='/'>board </Link>
      <Link to='/about'>about</Link>
      {/* 配置二级路由出口 */}
      <Outlet />
    </div>
  )
}

export default Layout