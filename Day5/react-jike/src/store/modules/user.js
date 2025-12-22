//用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
createSlice({
  name: "user",
  //声明数据状态
  initialState: {
    token: ''
  },
  //同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    }
  }
})