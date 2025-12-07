// Day3\redux-meituan\src\store\modules\takeaway.js
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const foodsStore = createSlice({
  name: 'foods',
  initialState: {
    foodsList: []
  },
  reducers: {
    setFoodList(state, action) {
      state.foodsList = action.payload;
    }
  }
})

//异步
const { setFoodList } = foodsStore.actions
const fetchFoodsList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:3004/takeaway')

    dispatch(setFoodList(res.data))
  }
}

export { fetchFoodsList }
const reducer = foodsStore.reducer
export default reducer