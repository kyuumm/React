import { createSlice } from "@reduxjs/toolkit"

const counterStore = createSlice({
  name: 'counter',
  //初始化state
  initialState: {
    count: 0
  },
  //修改状态的方法，同步方法，支持直接修改
  reducers: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    //在reducers的同步修改方法中添加action对象参数，
    // 在调用actionCreator的时候传递参数，
    // 参数会被传递到action对象payload属性上
    addToNum(state, action) {
      state.count = action.payload
    }
  }
})
//解构出来actionCreator函数
const { increment, decrement, addToNum } = counterStore.actions

//reducer
const reducer = counterStore.reducer

//按需导出，导出actionCreator
export { increment, decrement, addToNum }
//默认导出导出reducer
export default reducer
