import { useState, useEffect } from 'react';
import { getChannelAPI } from '@/apis/article'
//封装获取频道列表的逻辑

function useChannel() {
  //获取频道列表
  const [channelLists, setChannelsLists] = useState([])


  useEffect(() => {
    //1.封装函数 在函数体内调用接口
    const getChannelLists = async () => {
      const res = await getChannelAPI();
      setChannelsLists(res.data.data.channels)

    }
    //2.调用函数
    getChannelLists();
  }, [])
  return { channelLists }
}
export { useChannel }