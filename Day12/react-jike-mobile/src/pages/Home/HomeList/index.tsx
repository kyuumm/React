import { Image, List } from 'antd-mobile'
// mock数据
import { users } from './users.ts'
import { useEffect, useState } from 'react'
import { fetchListAPI, } from '@/apis/list'
import type { ListRes } from '@/apis/list'
const HomeList = () => {
  //列表数据
  const [listRes, setListRes] = useState<ListRes>({
    results: [],
    pre_timestamp: '' + new Date().getTime(),
  })

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await fetchListAPI({
          channel_id: '0',
          timestamp: '' + new Date().getTime(),
        })
        setListRes({
          results: res.data.data.results,
          pre_timestamp: res.data.data.pre_timestamp
        })
      } catch (error) {
        throw new Error('获取列表失败')
      }
      getList();

    }
  }, [])
  //我的世界一直在报错我处理不好

  return (
    <>
      <List>
        {listRes.results.map((item) => (
          <List.Item
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
    </>
  )
}

export default HomeList
