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
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState, useEffect, use } from 'react'
import { getChannelAPI, createArticleAPI, getArticleById, updateArticleAPI } from '@/apis/article'
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
        //url处理逻辑只使用于新增，编辑不适用
        images: imageList.map(item => {
          if (item.response) { return item.response.data.url; }
          else { return item.url; }
        })//图片列表
      },
      channel_id: channel_id,
    }

    //调用不同接口
    if (articleId) {
      //更新接口
      updateArticleAPI({ ...reqData, id: articleId })
    } else {
      //新增接口
      createArticleAPI(reqData)
    }

    message.success(articleId ? '修改成功' : '发布成功')
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

  //回填数据
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  console.log(articleId);

  //获取文章详情
  const [form] = Form.useForm(); //获取Form数据，绑定在form变量上


  useEffect(() => {
    //1 id获取数据
    async function getArticleDetail() {
      const res = await getArticleById(articleId)
      const data = res.data.data;
      console.log(data);

      form.setFieldsValue({
        ...data,
        type: data.cover.type,
      })
      // 为什么现在的写法无法回填封面?
      //数据结构的问题 set方法 -> { type:3} { cover:{ type:3}}
      // 回填图片列表
      setImageType(data.cover.type)
      //显示图片。类型：{url:url}
      setImageList(data.cover.images.map(url => {
        return { url }
      }))

    }
    //只有id时候才能调用
    if (articleId) {
      getArticleDetail()
    }
    //2 实例方法


  }, [articleId, form])

  return (
    <div className="publish">
      <Card //结构美化
        title={  //面包屑导航
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: `${articleId ? '编辑文章' : '发布文章'}` }
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ imageType: 0 }}
          onFinish={onFinish}
          form={form}
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
          <Form.Item label="封面" name="type">
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
                  fileList={imageList}
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
