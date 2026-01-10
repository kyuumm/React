import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState, useEffect } from 'react'
import { getChannelAPI, createArticleAPI } from '@/apis/article'
import { type } from '@testing-library/user-event/dist/type'
import { useChannel } from '@/hooks/useChannel'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

const Publish = () => {
  const [imageList, setImageList] = useState([]);
  const { channelLists } = useChannel()
  const navigate = useNavigate()

  const onFinish = (values) => {
    //校验图片类型
    if (imageList.length !== imageType) { return message.warning('封面类型和图片数量不匹配') }

    const { title, content, channel_id } = values
    //按接口文档格式处理表单数据
    const reqData = {
      title: title,
      content: content,
      cover: {
        type: imageType,//图片类型
        images: imageList.map(item => item.response.data.url)//图片列表
      },
      channel_id: channel_id,
    }

    createArticleAPI(reqData)

    message.success('发布成功')
    setTimeout(() =>
      navigate('/article'), 2000
    )
  }

  const onChange = (info) => {
    setImageList(info.fileList);
  }
  //切换图片类型
  const [imageType, setImageType] = useState(0)
  const onImageTypeChange = (e) => {
    setImageType(e.target.value)
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
          initialValues={{ imageType: 0 }}
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
              {channelLists.map(item => <Option value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item>
              <Radio.Group value={imageType} onChange={onImageTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
              {/* list type 决定选择文件框的外观 */}
              {/* showUploadList 控制显示上传列表 */}
              {imageType > 0 &&
                <Upload
                  listType="picture-card"
                  showUploadList
                  action={'http://geek.itheima.net/v1_0/upload'}
                  onChange={onChange}
                  name='image'
                  maxCount={imageType}
                >
                  <div style={{ marginTop: 8 }}>
                    <PlusOutlined />
                  </div>
                </Upload>
              }
            </Form.Item>
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
