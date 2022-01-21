import { useParams,useNavigate } from 'react-router-dom';
import React, { useRef } from 'react'
import '../Manage/Alter.css'
import axios from 'axios'
import { message, Button, Space } from 'antd';


export default function Alter() {
    const params = useParams();
    const inputref = useRef();
    const navigate = useNavigate();
    // console.log(params.id);
    
    let tomessage=()=> navigate('/siderpage/manage/manage')
    let send=(e)=>{
        const token = localStorage.getItem('X-Token');
       axios.post(`/news/column/update?columnName=${/* params.name */inputref.current.value}&columnId=${params.id}`,`columnId=${params.id}`,{ headers: { 'X-Token': `${token}` }}).then(resp=>{
        console.log(resp);
        if(resp.data.code==2){
            message.success(resp.data.message);
            tomessage();
        }else{
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
                <b className='new'>新闻添加</b>
            </div>
            <div className='number'>
                <span>栏目编号</span>
                <input value={params.id} disabled></input>
            </div>
            <div className='number'>
                <span>栏目名称</span>
                <input ref={inputref} defaultValue={params.name}></input>
            </div>
            <div className='info'>
            <span onClick={send}>提交</span>
            </div>
            
        </div>
    )
}
