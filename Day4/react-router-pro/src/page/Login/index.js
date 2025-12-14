import { Link, useParams, useSearchParams } from 'react-router-dom'
const Login = () => {
  const [params] = useSearchParams();
  const id = params.get('id');
  ////
  const params2 = useParams();
  const id2 = params2.id2;
  const name2 = params2.name2;
  return (

    <div>
      this is page Login
      <Link to='/article'>跳转to article</Link>
      <p>
        this is id : {id}
      </p>
      <p>
        this is id2 : {id2}
      </p>
      <p>
        this is name2 : {name2}
      </p>
    </div>
  )
}

export default Login
