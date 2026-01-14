import { Component } from 'react';
class Counter extends Component {
  // 编写组件的逻辑代码
  // 1.状态变量 
  state = {
    count: 0
  }
  // 2.事件回调
  setCount = (count) => {
    this.setState({
      count: this.state.count + 1
    })
  }
  // 3.UI(JSX)渲染
  render() {
    return <button onClick={this.setCount}>{this.state.count}</button>
  }
}

function App() {

  return (
    <>
      <Counter />
    </>
  )
}

export default App;
