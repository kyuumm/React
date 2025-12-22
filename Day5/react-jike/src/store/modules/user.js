//用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
// import { use } from "react";
import { request } from "@/utils";

const userStore = createSlice({
  name: "user",
  //声明数据状态
  initialState: {
    token: localStorage.getItem('token_key') || ''
  },
  //同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      //存本地
      localStorage.setItem('token_key', action.payload);
    }
  }
})

//解构出action creator
const { setToken } = userStore.actions

//获取reducer函数
const userReducer = userStore.reducer;

//异步方法
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    //1 send
    const res = await request.post('/authorizations', loginForm);
    //2 提交同步action进行token存储
    console.log(res.data);

    dispatch(setToken(res.data.data.token));
  }
}

export { fetchLogin, setToken }

export default userReducer
