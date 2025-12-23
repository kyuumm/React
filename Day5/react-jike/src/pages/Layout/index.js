//test token
import { request, getToken } from "@/utils"
import { useEffect } from "react"
const Layout = () => {
  useEffect(() => {
    const token = getToken()
    if (!token) return
    request.get('/user/profile').catch((err) => {
      // avoid unhandled promise rejection when token is missing/invalid
      console.error('fetch /user/profile failed', err)
    })
  }, [])
  return <div>this is Layout</div>
}
export default Layout
