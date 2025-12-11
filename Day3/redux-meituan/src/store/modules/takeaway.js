// Day3\redux-meituan\src\store\modules\takeaway.js
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const foodsStore = createSlice({
  name: 'foods',
  initialState: {
    foodsList: [],
    //菜单激活下标
    activeIndex: 0,
    //cart
    cartList: []
  },
  reducers: {
    setFoodList(state, action) {
      state.foodsList = action.payload;
    },
    changeActiveIndex(state, action) {
      state.activeIndex = action.payload;
    },
    addCart(state, action) {
      // 是否添加过?以action.payload.id去cartList中匹配 匹配到了 添加过
      const item = state.cartList.find(item => item.id === action.payload.id);
      if (item) {
        item.count++;
      } else {
        state.cartList.push(action.payload)
      }
    },

    //count+

    increCount(state, action) {
      //修改谁的count-》id
      const item = state.cartList.find(item => item.id === action.payload.id);
      item.count++;
    },

    //count-
    decreCount(state, action) {
      //修改谁的count-》id
      const item = state.cartList.find(item => item.id === action.payload.id);
      if (item.count === 0) { return; }
      item.count--;
      if (item.count <= 0) {
        state.cartList = state.cartList.filter(v => v.id !== action.payload.id);
      }
    },
    //clear cart
    clearCart(state) {
      state.cartList = [];

    }

  }
})

//异步
const { setFoodList, changeActiveIndex, addCart, increCount, decreCount, clearCart } = foodsStore.actions

const fetchFoodsList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:3004/takeaway')

    dispatch(setFoodList(res.data))
  }
}

export { fetchFoodsList, changeActiveIndex, addCart, increCount, decreCount, clearCart }
const reducer = foodsStore.reducer
export default reducer