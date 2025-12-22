//用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
// import { use } from "react";
import { request } from "@/utils";
import { setToken as _setToken, getToken as _getToken, removeToken as _removeToken } from "@/utils";

const userStore = createSlice({
  name: "user",
  //声明数据状态
  initialState: {
    token: _getToken('token_key') || ''
  },
  //同步修改方法
  reducers: {
    setToken(state, action) {
      if (action.payload != null && action.payload !== '') {
        state.token = action.payload;
        // persist token
        _setToken('token_key', action.payload);
      }
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
    const token = res?.data?.data?.token ?? res?.data?.token;

  }
}

export { fetchLogin, setToken }

export default userReducer
