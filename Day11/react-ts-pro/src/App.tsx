import { useEffect, useRef } from "react";

//1.获取dom
//2.稳定引用的存储器(定时器管理)

function App() {
  const domRef = useRef<HTMLInputElement>(null);
  const timerId = useRef<number | undefined>(undefined);

  useEffect(() => {
    domRef.current?.focus();
    timerId.current = setInterval(() => {
      console.log('eyy');
    }, 1000)
    return () => clearInterval(timerId.current)
  }, [])

  return (
    <>
      <input ref={domRef} />
    </>
  )
}
// 适合管理那些不需要触发重新渲染但需要在组件生命周期中保持的数据。
export default App;
