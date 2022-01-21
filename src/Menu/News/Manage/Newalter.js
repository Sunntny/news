import '../Manage/Newalter.css'
import { Upload, message, Button,Space  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import E from 'wangeditor'
import { useParams } from 'react-router-dom';

let editor;
const token = localStorage.getItem('X-Token');
export default function Newalter() {
  let [obj, setObj] = useState({})
  let [data, setData] = useState([])
  const params = useParams();
  let [va, setVa] = useState([])
  const titlevalue = useRef()
  const remarkvalue = useRef()
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

    let id = params.id;
    axios.get("/news/detail?newsId=" + id, { headers: { 'X-Token': `${token}` } }).then(resp => {
      setData(resp.data.data)

      axios.get("/news/column/all", { headers: { 'X-Token': `${token}` } }).then(resp => {
        // console.log(resp);
        va = resp.data.data;
        // console.log(va);
        setVa(va)
      })
      va = resp.data.data;
      obj = va;
      setObj(obj)
      editor.txt.append(`<p>${obj.content}</p >`)
      // setVa(va)
      // console.log(va);
    })

  }, [])

  let resist = () => {
    editor.txt.clear()
  }
  //文件上传
  const props = {

    name: 'file',
    action: 'http://192.168.0.254:8086/news/upload',
    headers: {
      'X-Token': `${token}`,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  }
  //点击提交
  const navigate = useNavigate();
  let tomanage = () => navigate('/siderpage/news/manage/newmanage')
  let send = () => {
    const token = localStorage.getItem('X-Token');
    let contentva = editor.txt.text();
    let id = document.getElementById("cla").value;
    console.log(params.id);
    const formdata = new FormData();
    formdata.append('title', titlevalue.current.value);
    formdata.append('content', contentva);
    formdata.append('columnId', id);
    formdata.append('pic', url);
    formdata.append('newsId',params.id);
    formdata.append('remark', remarkvalue);
    axios.post(`/news/update`,formdata, { headers: { 'X-Token': `${token}` } }).then(resp => {
      if (resp.data.code == 2) {
        console.log(resp);
        message.success(resp.data.message);
        tomanage();
      }else {
        message.error(resp.data.message)
      }
    })
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
        <b className='new'>新闻修改</b>
      </div>
      <div className='newsid'>
        <span>新闻编号</span>
        <input defaultValue={obj.newsId} disabled></input>
      </div>
      <div className='newsid'>
        <span>新闻标题</span>
        <input ref={titlevalue} defaultValue={obj.title}></input>
      </div>
      <div className='newsid'>
        <span>新闻描述</span>
        <input ref={remarkvalue} defaultValue={obj.remark}></input>
      </div>
      <div className='newsid'>
        <span> 新闻作者 </span>
        <input value="admin" disabled></input>
      </div>
      <div className='classify'>
        <span>新闻的分类</span>
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
        <img src={data.pic}></img>
      </div>
      <div id='div1'></div>
      <div className='resisit'>
        <span onClick={send}>提交</span>
        <span onClick={resist}>重置</span>
      </div>
    </div>
  )
}
