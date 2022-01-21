import '../Manage/Manage.css'
import { useEffect, useState } from "react"
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import { Table, Pagination, message, Popconfirm, Button, Space } from 'antd';

export default function Manage() {
    let [news, setNews] = useState([]);
    // const token=localStorage.getItem('X-Token');

    useEffect(() => {
        const token = localStorage.getItem('X-Token');
        console.log(token);
        axios.get("/news/column/all", { headers: { 'X-Token': `${token}` } }).then(resp => {
            news = resp.data.data;
            // console.log(resp);
            setNews(news)
        })
    }, [])
    //点击删除  
    const navigate = useNavigate();
    // let tosiderPage = () => navigate('/siderpage/manage')

    let del = (e) => {
        // console.log(e.target.id);
        const token = localStorage.getItem('X-Token');
        console.log(token);
        axios.get(`/news/column/delete?columnId=${e.target.id}`, { headers: { 'X-Token': `${token}` } }).then(resp => {
            console.log(resp);
            if (resp.data.code == 2) {
                // window.location.reload();
            } else if (resp.data.code == 3 || resp.data.code == 4) {
                message.error(resp.data.message)
            }
        })
    }
    function confirm(e) {
        console.log(e);
        window.location.reload();
        message.success('删除成功');
    }

    function cancel(e) {
        console.log(e);
        message.error('取消删除');
    }


    const columns = [
        {
            title: '栏目编号',
            dataIndex: 'columnId',
            key: 'columnId',
            align: 'center',

        },
        {
            title: '名称',
            dataIndex: 'columnName',//数据索引
            key: 'columnName',
            align: 'center',

        },
        {
            title: '操作',
            key: 'operation',
            align: 'center',
            render: (s, temp) => <span className='pressbutton'>{/* s代表当前字段。temp当前行 */}
                <button><Link to={`/siderpage/manage/alter${temp.columnId}/${temp.columnName}`}>修改</Link></button>
                <Popconfirm title="是否确认删除?"onConfirm={confirm} onCancel={cancel} okText="是" cancelText="否">
                   <button id={temp.columnId} onClick={del}>删除</button>
                </Popconfirm>
                
            </span>
        },
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
                <b className='new'>新闻栏目管理</b>
            </div>
            <Table columns={columns} dataSource={news} />

        </div>

    )
}
