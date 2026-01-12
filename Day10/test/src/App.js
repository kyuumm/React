//useReducer

import { useReducer, useState, useMemo } from "react";

//1.定义reducer函数 根据不同的action返回不同的状态
function reducer(state, action) {
  switch (action.type) {
    case 'INC':
      return state + 1
    case 'DEC':
      return state - 1;
    case 'RANDOM':
      return Math.floor(Math.random() * 100);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

function fib(n) {
  console.log('fib was called');

  if (n < 3) {
    return 1;
  }
  return fib(n - 2) + fib(n - 1)
}

function App() {
  // 2.组件中调用useReducer(reducer，0) => [state,dispatch]
  const [state, dispatch] = useReducer(reducer, 0)

  const [count1, setCount1] = useState(0);

  const result = useMemo(() => {
    return fib(count1)
  }, [count1])

  const [count2, setCount2] = useState(0);
  console.log('rendered again');

  return (
    //dispatch传入一个对象
    // 3.调用dispatch({type:'INC'}) =>通知reducer产生一个新的状态 使用这个新状态更新UI
    <div className="App">
      <button onClick={() => dispatch({ type: "DEC" })}>-</button>
      {state}
      <button onClick={() => dispatch({ type: "INC" })}>+</button>
      <br />
      <button onClick={() => dispatch({ type: "RANDOM" })}>?</button>
      <button onClick={() => dispatch({ type: "SET", payload: 100 })}>100</button>
      <br />
      <button onClick={() => setCount1(count1 + 1)}>change count1:{count1}</button>
      {result}
      <button onClick={() => setCount2(count2 + 1)}>change count2:{count2}</button>

    </div>
  );
}

export default App;
