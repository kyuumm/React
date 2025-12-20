//账单列表
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const billStore = createSlice({
  name: 'bill',
  initialState: {
    billList: []
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload;
    },
    //同步添加账单
    addBill(state, action) {
      state.billList.push(action.payload)
    },
  }
})

//解构actionCreator函数
const { setBillList, addBill } = billStore.actions;

//async
const getBillList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:8888/ka');
    dispatch(setBillList(res.data))
  }
}

const addBillList = (data) => {
  return async (dispatch) => {
    //编写异步请求
    const res = await axios.post('http://localhost:8888/ka', data);
    //触发同步reducer
    dispatch(addBill(res.data));
  }
}

export { getBillList, addBillList }
const reducer = billStore.reducer;

export default reducer;