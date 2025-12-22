import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    // console.log('Success:', values);

    //触发异步action
    await dispatch(fetchLogin(values));
    //异步执行成功了才继续跳转
    //1跳转首页
    navigate('/')
    //2提示准备跳转 
    message.success('登录成功')
  };

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item
            name="mobile"//和后端接口保持一致
            //多条校验逻辑 先校验第一条 第一条通过之后再校验第二条
            rules={[
              {
                required: true,
                message: "请输入手机号",

              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "请输入正确的手机号格式"
              }
            ]}>
            <Input size="large" placeholder="输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[{ required: true, message: "请输入验证码" }]}>
            <Input size="large" placeholder="输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login