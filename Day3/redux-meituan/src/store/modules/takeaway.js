// Day3\redux-meituan\src\store\modules\takeaway.js
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const foodsStore = createSlice({
  name: 'foods',
  initialState: {
    foodsList: [],
    //菜单激活下标
    activeIndex: 0
  },
  reducers: {
    setFoodList(state, action) {
      state.foodsList = action.payload;
    },
    changeActiveIndex(state, action) {
      state.activeIndex = action.payload;
    }
  }
})

//异步
const { setFoodList, changeActiveIndex } = foodsStore.actions

const fetchFoodsList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:3004/takeaway')

    dispatch(setFoodList(res.data))
  }
}

export { fetchFoodsList, changeActiveIndex }
const reducer = foodsStore.reducer
export default reducer