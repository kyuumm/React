//zustand
import { useEffect } from 'react';
import { create } from 'zustand';
const URL = 'https://geek.itheima.net/v1_0/channels'
//1. create a store

//语法容易出错
//1.函数参数必须返回一个对象 对象内部编写状态数据和方法
//2.set是用来修改数据的专门方法必须调用它来修改数据
//语法1:参数是函数 需要用到老数据的场景
//语法2:参数直接是一个对象 set({count:100 })

//切片模式
//1拆分子模块，再组合
const createCounterStore = (set) => {
  return {
    count: 0,
    inc: () => {
      set((state) => ({ count: state.count + 1 }))
    },
  }

}

const createChannelStore = (set) => {
  return {
    channelList: [],
    fetchList: async () => {
      const res = await fetch(URL);
      const jsonRes = await res.json();
      console.log(jsonRes.data);
      set({
        channelList: jsonRes.data.channels
      })
    }
  }
}

const useStore = create((...a) => {
  return {
    ...createCounterStore(...a),
    ...createChannelStore(...a),
  }
})
//2绑定store到组件

function App() {
  //2组件使用
  const { count, inc, fetchList, channelList } = useStore()
  useEffect(() => { fetchList() }, [fetchList])
  return (
    <>
      <button onClick={inc}>{count}</button>
      <ul>
        {
          channelList.map(item => <li key={item.id}>{item.name}</li>)
        }
      </ul>
    </>
  )
}

export default App;
