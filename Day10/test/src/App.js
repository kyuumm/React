//useReducer

import { useReducer, useState, useMemo, memo } from "react";
//1.传递一个简单类型的propprop变化时组件重新渲染
//2.传递一个引用类型的prop,比较的是新值和旧值的引用是否相等
//3.保证引用稳定 ->useMemo 组件渲染的过程中缓存一个值

const MemoChild = memo(
  function Child({ list }) {
    console.log("Child Rendered");

    return <div>Child {list}</div>
  }
)
/* function Child() {
  console.log("Child Rendered");

  return <div>Child</div>
} */
function App() {
  const list = useMemo(() => [1, 2, 3, 4, 5], []); //useMemo缓存list的值
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <button onClick={() => { setCount(count + 1) }}>count</button>
      <MemoChild list={list} />
    </div>
  );
}

export default App;
