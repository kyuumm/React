import { useNavigate } from 'react-router-dom'

const Article = () => {
  const navigator = useNavigate()
  return (

    <div>
      this is page article
      {/* <Link to='/login'>跳转to login</Link> */}
      <button onClick={() => navigator('/login')}>Click here to article</button>
      <button onClick={() => navigator('/login?id=1001&name=nihao')}>to article with searchParams</button>
      <button onClick={() => navigator('/login/1001/nihao')}>to article with params</button>
    </div>
  )
}


export default Article
