import '../Search/Newsearch.css';
import { Table, Popconfirm, message } from 'antd';
import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'

export default function Newsearch() {
    let [count, setCount] = useState([])
    let [da, setDa] = useState([])

    const columns = [
        {
            title: '新闻编号',
            dataIndex: 'newsId',
            render: text => <a>{text}</a>,
        },
        {
            title: '新闻标题',
            dataIndex: 'title',
            align: 'center',
        },
        {
            title: '作者',
            dataIndex: 'author',
            align: 'center',
        },
        {
            title: '创建时间',
            dataIndex: 'date',
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'address',
            align: 'center',
            render: (s, temp) => <span className='information'>
                <button id={temp.newsId}><Link to={`/siderpage/news/manage/newalter/${temp.newsId}`}>修改</Link></button>
                <Popconfirm title="是否确认删除?" onConfirm={confirm} onCancel={cancel} okText="是" cancelText="否">
                    <button onClick={del} id={temp.newsId}>删除</button>
                </Popconfirm>
                <button id={temp.newsId}><Link to={`/siderpage/news/manage/newcheck/${temp.newsId}`}>查看</Link></button>
            </span>
        }
    ];

    //点击查看
    let navigate = useNavigate();
    let tonewcheck = () => navigate('/siderpage/news/manage/newcheck')
    let searching = () => {
        tonewcheck();
    }
    //点击查询
    const idinputref = useRef();//编号
    const titleinputref = useRef();//标题
    const dateinputref = useRef();//日期
    const pageinputref = useRef();//日期

    let onsearch = () => {
        const token = localStorage.getItem('X-Token');
        axios.get(`/news/query?newsId=${idinputref.current.value}&title=${titleinputref.current.value}&page=${pageinputref.current.value}`, { headers: { 'X-Token': `${token}` } }).then(resp => {
            let count = resp.data.data.list;
            console.log(count);
            setCount(count)

            console.log(resp.data);

        })
    }
    //删除
    const token = localStorage.getItem('X-Token');
    let del = (e) => {
        // console.log(e.target.id);
        axios.get(`/news/delete?newsId=${e.target.id}`, { headers: { 'X-Token': `${token}` } }).then(resp => {
            da = resp.data;
            console.log(da);
            if (da.code == 2) {
                // message.success(da.message);
            } else {
                message.error(da.message)
            }
        })
        
    }
    function confirm(e) {
        console.log(e);
        message.success('删除成功');
        window.location.reload()
    }

    function cancel(e) {
        console.log(e);
        message.error('取消删除');
    }
    return (
        <div>
            <div className='place'>
                <span>您当前的位置:</span>
                <span>管理首页</span>
                <span>{">"}</span>
                <span><Link to='/siderpage/news/manage/newmanage'>栏目管理</Link></span>
            </div>
            <div>
                <b className='new'>新闻查询</b>
            </div>
            <div className="search">
                <input placeholder='编号' ref={idinputref}></input>
                <input placeholder='标题' ref={titleinputref}></input>
                <input placeholder='日期' ref={dateinputref}></input>
                <input placeholder='页数' ref={pageinputref}></input>
                <span onClick={onsearch}>查询</span>
            </div>
            <div>
                <Table
                    columns={columns}
                    dataSource={count}
                    bordered
                />
            </div>
        </div>
    )
}
