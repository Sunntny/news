import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../Manage/Newmanage.css'
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function Newmanage() {
    const [data, setdata] = useState([])
    const [page, setpage] = useState([])
    const [currpage, setcerrpage] = useState([])
    let [da, setDa] = useState([])
    useEffect(() => {
        const token = localStorage.getItem('X-Token');
        console.log(token);
        axios.get("/news/list", { headers: { 'X-Token': `${token}` } }).then(resp => {
            setdata(resp.data.data.list);
            setpage(resp.data.data.total);
            setcerrpage(resp.data.data.pageNum);
        })
    }, [])

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
    //确认是否删除
    function confirm(e) {
        console.log(e);
        window.location.reload()
        message.success('删除成功');
    }

    function cancel(e) {
        console.log(e);
        message.error('取消删除');
    }

    const changePage = (page) => {
        axios.get(`/news/list?page=${page}`, { headers: { 'X-Token': `${token}` } }).then(resp => {
            setdata(resp.data.data.list);
            setpage(resp.data.data.total);
            setcerrpage(resp.data.data.pageNum);
        })
    }
    const columns = [
        {
            title: '新闻编号',
            dataIndex: 'newsId',
            align: 'center',
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
            key: 'operation',
            align: 'center',
            render: (a, b) => <span className='press'>
                <button id={b.newsId}><Link to={`/siderpage/news/manage/newalter/${b.newsId}`}>修改</Link></button>
                {/* <button id={b.newsId} onClick={del}>删除</button> */}
                <Popconfirm title="是否确认删除?" onConfirm={confirm} onCancel={cancel} okText="是" cancelText="否" >
                    <button id={b.newsId} onClick={del}>删除</button>
                </Popconfirm>
                <button id={b.newsId}><Link to={`/siderpage/news/manage/newcheck/${b.newsId}`}>查看</Link></button>
            </span>
        }
    ];

    return (
        <div>

            <div className='place'>
                <span>您当前的位置:</span>
                <span>管理首页</span>
                <span>{">"}</span>
                <span>栏目管理</span>
            </div>
            <div>
                <b className='new'>新闻管理</b>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ total: page, onChange: changePage, current: currpage }}
            />

        </div>
    )
}
