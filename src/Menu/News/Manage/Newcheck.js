import '../Manage/Newcheck.css';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Layout } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';


export default function Newcheck() {
    const { Header, Content, Sider } = Layout;

    const params = useParams();
    let [data, setData] = useState([])
    useEffect(() => {
        const token = localStorage.getItem('X-Token');
        axios.get(`/news/detail?newsId=${params.id}`, { headers: { 'X-Token': `${token}` } }).then(resp => {
            console.log(resp);
            data = resp.data.data;
            setData(data)
            console.log(resp.data.data);
        })

    }, [])
    //点击返回
    const navigate = useNavigate();
    let tonewmanage = () => navigate("/siderpage/news/manage/newmanage")
    let back = () => {
        tonewmanage()
    }
    return (
        <div>
            <Layout>
                <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280, }}>
                    <div className='place'>
                        <span>您当前的位置:</span>
                        <span>管理首页</span>
                        <span>{">"}</span>
                        <span>栏目管理</span>
                    </div>
                    <div>
                        <b className='new'>新闻栏目管理</b>
                    </div>
                    <div>
                        <p>新闻作者：{data.author}</p>
                        <p>新闻标题：{data.title}</p>
                        <p>新闻描述：{data.remark}</p>
                        {/* <p>{data.content}</p> */}
                        <p dangerouslySetInnerHTML={{__html:data.content}}></p>
                        <p>{data.date}</p>
                        <span className='back' onClick={back} className="back">返回</span>
                        <img src={`http://192.168.0.254:8086/${data.pic}`} alt='' className='img'></img>
                    </div>
                   

                </Content>
            </Layout>

        </div>
    )
}
