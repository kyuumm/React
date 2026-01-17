import { fetchDetailAPI, type DetailDataType } from "@/apis/detail";
import { NavBar } from "antd-mobile";
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
const Detail = () => {
  const [detail, setDetail] = useState<DetailDataType | null>(null)

  //获取路由参数

  const [params] = useSearchParams()
  //这是React Router提供的一个钩子函数，用于读取和操作URL中的查询参数
  const id = params.get('id')
  //获取id参数

  useEffect(() => {
    const getDetail = async () => {
      try {
        const res = await fetchDetailAPI(id!)
        //非空断言操作符

        setDetail(res.data.data);
      } catch (error) {
        throw new Error('fetch detail error')
      }
    }

    getDetail();
  }, [id])

  const navigate = useNavigate();
  const back = () => {
    navigate(-1)
  }
  //React 要求 Hooks 必须在每次渲染时以相同的顺序调用
  //所有的Hooks调用需要在条件判断前

  //数据返回前显示
  if (!detail) {
    return <div>loading···</div>
  }


  return <div>
    <NavBar onBack={back}>{detail?.title}</NavBar>
    <div dangerouslySetInnerHTML={{
      __html: detail?.content
    }}></div>
  </div>
}

export default Detail;