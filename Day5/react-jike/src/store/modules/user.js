//用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
// import { use } from "react";
import { request, setToken as setTokenStorage, getToken as getTokenStorage } from "@/utils";

const userStore = createSlice({
  name: "user",
  //声明数据状态
  initialState: {
    token: getTokenStorage() || ''
  },
  //同步修改方法
  reducers: {
    setToken(state, action) {
      if (action.payload != null && action.payload !== '') {
        state.token = action.payload;
        // persist token
        setTokenStorage(action.payload);
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

    //2 ??token?Redux store
    if (token) {
      dispatch(setToken(token));
    } else {
      throw new Error('Login response missing token');
    }
  }
}

export { fetchLogin, setToken }

export default userReducer
