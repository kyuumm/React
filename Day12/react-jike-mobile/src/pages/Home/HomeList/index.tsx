import { Image, List, InfiniteScroll } from 'antd-mobile'
// mock数据
import { users } from './users.ts'
import { useEffect, useState } from 'react'
import { fetchListAPI, } from '@/apis/list'
import type { ListRes } from '@/apis/list'
import { useNavigate } from 'react-router-dom'

type Props = {
  channelId: string
}
const HomeList = (props: Props) => {
  const { channelId } = props

  //列表数据
  const [listRes, setListRes] = useState<ListRes>({
    results: [],
    pre_timestamp: '' + new Date().getTime(),

  })

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await fetchListAPI({
          channel_id: channelId,
          timestamp: '' + new Date().getTime(),
        })
        setListRes({
          results: res.data.data.results,
          pre_timestamp: res.data.data.pre_timestamp
        })
      } catch (error) {
        throw new Error('获取列表失败')
      }
    }
    getList();
  }, [])


  //上拉加载条件：
  //1 hasMore=true ，2 小于threshold

  const [hasMore, setHasMore] = useState(true)
  //加载下一页的函数
  const loadMore = async () => {
    try {
      const res = await fetchListAPI({
        channel_id: channelId,
        timestamp: listRes.pre_timestamp,
        // 这个参数用于告诉服务器要获取哪个时间点之前的数据
      })
      // 拼接新数据
      setListRes({
        results: [...listRes.results, ...res.data.data.results],
        pre_timestamp: res.data.data.pre_timestamp
      })

      if (res.data.data.results.length === 0) {
        setHasMore(false)
      }
    } catch (error) {
      throw new Error('获取列表失败')
    }

    // setHasMore(false)
  }

  const navigate = useNavigate()
  const goToDetail = (id: string) => {
    //路由跳转
    navigate(`/detail?id=${id}`);
  }

  return (
    <>
      <List>
        {listRes.results.map((item) => (
          <List.Item
            onClick={() => goToDetail(item.art_id)}
            key={item.art_id}
            prefix={
              <Image
                src={item.cover.images?.[0]}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={item.pubdate}
          >
            {item.title}
          </List.Item>

        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </>
  )
}


export default HomeList
