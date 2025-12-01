//项目的根组件
//App->index.js->public/index.html(root)
import { useState } from 'react'
//import the style
import './index.css'

const count = 100;
function a() {
  return 'Hello'
}
const NumList = [1, 2, 3]
const list = [
  { id: 1, name: 'Vue' },
  { id: 2, name: 'React' },
  { id: 3, name: 'Angular' },
]
const isLogin = true


function getArticle() {
  if (isLogin) { return ' yes ' }
  else { return <span> no </span> }
}
function App() {
  const clickHandler = (name, e) => {
    console.log('clicked', name, e);
    // 既要传递自定义参数，也要传递e事件
  }

  //1.调用useState添加一个状态变量
  //count 状态变量
  // setCount 修改状态变量的方法
  const [count, setCount] = useState(0);
  const [form, setForm] = useState({ name: 'mother' });
  const handleClick = () => {
    setCount(count + 1);
    //react中，状态是只读的，不能通过只修改变量实现视图更新，note有解释
  }
  const changeForm = () => {
    // form.name='child'  
    setForm({
      ...form,
      name: 'child'
    })
  }

  const style1 = {
    color: 'red',
    fontSize: '50px'
  }

  return (
    <div className="App">
      this is App
      {/* 用{}语法识别js中的表达式 */}
      eg1:
      {'this is message'}
      eg2:
      {count}
      eg3:
      {a()}
      {new Date().getDate()}
      eg4:
      <div style={{ color: 'pink' }}>use javaScript object</div>
      {/*  外层是识别表达式的语法，内层是要识别的对象结构*/}

      <br />

      {/* 渲染列表 */}
      {/* {/*渲染列表 */}
      {/* map 循环哪个结构 return结构 */}
      {/*注意事项:加上一个独一无二的key 字符串或者number id */}
      {/*key的作用:React框架内部使用 提升更新性能的*/}
      <ul>
        {NumList}
      </ul>
      <ul>
        {list.map(item => <li key={item.id}>{item.name}</li>)}
        {/* 每一个元素都要有一个独立的key */}
        {/* js不能像react这样直接渲染数组而不使用join */}
      </ul>


      {isLogin && <span>this is a span</span>}
      {isLogin ? <span>login success</span> : <span>loading...</span>}

      {/* 通过自定义函数使用if */}
      {getArticle()}

      {/* React 基础事件绑定
语法:on+事件名称={事件处理程序}，整体上遵循驼峰命名法 */}
      <button onClick={(e) => clickHandler('hola', e)}>click here</button>
      {/* 注意:不能直接写函数调用，这里事件绑定需要一个函数引用 */}



      {/* 组件就是用户界面的一部分，有逻辑和外观，组件之间可以相互嵌套，可以复用多次 */}
      {/* 一个组件就是首字母大写的函数，内部存放了组件的逻辑和视图UI，渲染组件只需要把组件当成标签书写 */}

      {/* 使用自定义组件Button */}
      <Button />
      {/* 自闭和 */}
      <Button></Button>
      {/* 成对 */}


      {/* useState 是一个 React Hook(函数)，它允许我们向组件添加一个状态变量，从而控制影响组件的渲染结果 */}
      <br />



      <div>
        {/* through Class name to control */}
        {/* **need to import the css file */}
        <button onClick={handleClick} className='foo'>{count}</button>
        {/* 样式可以写在外部变量里面 */}
        <button onClick={changeForm} style={style1}>test {form.name}</button>
      </div >
    </div>
  );
}

//自定义组件
function Button() {
  return <button>click yes</button>
}

export default App;
