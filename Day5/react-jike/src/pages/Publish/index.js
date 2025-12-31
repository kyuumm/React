import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState, useEffect } from 'react'
import { getChannelAPI, createArticleAPI } from '@/apis/article'
import { type } from '@testing-library/user-event/dist/type'

const { Option } = Select

const Publish = () => {
  //获取频道列表
  const [channelsLists, setChannelsLists] = useState([])

  useEffect(() => {
    //1.封装函数 在函数体内调用接口
    const getChannelLists = async () => {
      const res = await getChannelAPI();
      setChannelsLists(res.data.data.channels)

    }
    //2.调用函数
    getChannelLists();
  }, [])

  const onFinish = (values) => {
    const { title, content, channel_id } = values
    //按接口文档格式处理表单数据
    const reqData = {
      title: title,
      content: content,
      cover: {
        type: 0,
        images: []
      },
      channel_id: channel_id,
    }

    createArticleAPI(reqData)
  }

  return (
    <div className="publish">
      <Card //结构美化
        title={  //面包屑导航
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '发布文章' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelsLists.map(item => <Option value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              placeholder="请输入文章内容"
              theme="snow"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
