import '../Manage/Add.css'
import React, { useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { message, Button, Space } from 'antd';


export default function Add() {
  const inputref = useRef()
  const token = localStorage.getItem('X-Token');
  const navigate = useNavigate();
  let tomanage = () => navigate('/siderpage/manage/manage')
  let submit = () => {

    axios.post("/news/column/add", `columnName=${inputref.current.value}`, { headers: { 'X-Token': `${token}` } }).then(resp => {
      console.log(resp.data);
      if (resp.data.code == 2) {
        message.success(resp.data.message);
        tomanage();
      } else {
        message.error(resp.data.message);
      }
    })
  }
  return (
    <div>
      <div className='manage'>
        <span>您当前的位置:</span>
        <span>栏目管理</span>
      </div>
      <div>
        <h3>添加栏目</h3>
      </div>
      <div className='info'>
        <b>栏目名称</b>
        <input ref={inputref}></input>
        <span onClick={submit}>提交</span>
      </div>
    </div>
  )
}
