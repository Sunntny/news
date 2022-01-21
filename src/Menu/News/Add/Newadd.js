// import { Input, Menu, Dropdown, Button, Cascader } from 'antd';
import { Upload, message, Button,Space  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import E from 'wangeditor'
import Form from 'antd/lib/form/Form';
import '../../News/Add/Newsadd.css'

let editor;
const token = localStorage.getItem('X-Token');
export default function Newadd() {
  let [va, setVa] = useState([])
  const titlevalue = useRef();
  const remarkvalue = useRef();
  // const pa = useParams();
  const[url,seturl]=useState('')

  useEffect(() => {
    editor = new E('#div1')
    editor.config.uploadFileName = 'file'
    editor.config.uploadImgServer = '/news/upload'
    editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
    editor.config.uploadImgMaxSize = 50 * 1024 * 1024
    // editor.config.uploadImgParams = {
    //     "X-Token": localStorage.getItem("X-Token"),
    // }
    editor.config.uploadImgHeaders = {
      "X-Token": localStorage.getItem("X-Token"),
    }


    editor.config.uploadImgHooks = {
      success: function (xhr) {
        console.log('success', xhr)
      },
      // 图片上传并返回了结果，但图片插入时出错了
      fail: function (xhr, editor, resData) {
        console.log('fail', resData)
      },
      // 上传图片出错，一般为 http 请求的错误
      error: function (xhr, editor, resData) {
        console.log('error', xhr, resData)
      }
    }


    editor.create()
    const token = localStorage.getItem('X-Token');

    axios.get("/news/column/all", { headers: { 'X-Token': `${token}` } }).then(resp => {
      va = resp.data.data;
      setVa(va)
      // console.log(va);
    })
  }, [])

  //点击提交
  const navigate = useNavigate();
  let tomanage = () => navigate('/siderpage/news/manage/newmanage')
  let send = () => {
    const token = localStorage.getItem('X-Token');
    let contentva = editor.txt.html();
    console.log(contentva);
    let id = document.getElementById("cla").value;
    const formdata = new FormData();
    formdata.append('title', titlevalue.current.value);
    formdata.append('content', contentva);
    formdata.append('columnId', id);
    formdata.append('pic', url);
    formdata.append('remark', remarkvalue.current.value);

    axios.post('/news/add', formdata, { headers: { 'X-Token': `${token}` } }).then(resp => {
      if (resp.data.code == 2) {
        message.success(resp.data.message);
        tomanage();
      } else {
        message.error(resp.data.message)
      }
    })
  }
  //重置
  let resist = () => {
    editor.txt.clear()
  }
  //文件上传
  const props = {

    name: 'file',
    action: '/news/upload',
    listType:'picture',
    headers: {
      'X-Token': `${token}`,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
        //找url的路径
        seturl(JSON.parse(info.file.xhr.responseText).data[0].url)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  }

  return (
    <div>
      <div className='place'>
        <span>您当前的位置:</span>
        <span>管理首页</span>
        <span>{">"}</span>
        <span>新闻添加</span>
      </div>
      <div>
        <b className='new'>新闻栏目管理</b>
      </div>
      <div className='title'>
        <input ref={titlevalue} placeholder='新闻标题'></input>
        <input ref={remarkvalue} placeholder='新闻描述'></input>
        <input value="admin" disabled placeholder='新闻作者'></input>
      </div>
      <div className='classify'>
        {/* <span>新闻的分类</span> */}
        <select id='cla'>
          {va.map((item, index) => {
            return (
              <option key={index} value={item.columnId}>{item.columnName}</option>
            )
          })}
        </select>
      </div>
      <div className='file'>

        <Upload {...props}>
          <Button icon={<UploadOutlined />}>选择文件</Button>
        </Upload>


      </div>
      <div id='div1'></div>
      <div className='resisit'>
        <span onClick={send}>提交</span>
        <span onClick={resist}>重置</span>
      </div>
    </div>
  )
}
