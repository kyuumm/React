import { useEffect, useState } from "react";
const URL = 'http://geek.itheima.net/v1_0/channels'

//自定义hook函数
function useToggle() {
  const [value, setValue] = useState()
  const toggle = () => setValue(!value)

  return {
    value,
    toggle
  }

}

function App() {

  const { value, toggle } = useToggle()

  return (
    <div>
      {value && <div>this is div</div>}
      <button onClick={toggle}>toggle</button>
    </div>
  );
}

export default App;
