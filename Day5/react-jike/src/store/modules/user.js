//用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
// import { use } from "react";
import { request, setToken as setTokenStorage, getToken as getTokenStorage, removeToken } from "@/utils";
import { loginAPI, getProfileAPI } from "@/apis/user";

const userStore = createSlice({
  name: "user",
  //声明数据状态
  initialState: {
    token: getTokenStorage() || '',
    userInfo: {}
  },
  //同步修改方法
  reducers: {
    setToken(state, action) {
      if (action.payload != null && action.payload !== '') {
        state.token = action.payload;
        // persist token
        setTokenStorage(action.payload);
      }
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = '';
      state.userInfo = {};
      removeToken();
    }

  }
})

//解构出action creator
const { setToken, setUserInfo, clearUserInfo } = userStore.actions

//获取reducer函数
const userReducer = userStore.reducer;

//异步方法
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    //1 send
    const res = await loginAPI(loginForm);
    const token = res?.data?.data?.token ?? res?.data?.token;

    dispatch(setToken(token));
  }
}
const fetchUserInfo = () => {
  return async (dispatch) => {
    //1 send
    const res = await getProfileAPI();
    const info = res.data.data;

    dispatch(setUserInfo(info));
  }
}

export { fetchLogin, setToken, setUserInfo, fetchUserInfo, clearUserInfo }

export default userReducer
