// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import { render } from 'react-dom';
import { ConfigProvider, DatePicker, message,Button, Space } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import { Outlet, Link,useNavigate } from 'react-router-dom'
import { Layout, Menu, Breadcrumb} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import '../Menu/Siderpage.css'
import axios from 'axios'
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
moment.locale('zh-cn');

export default function Siderpage() {
    //安全退出
    const navigate = useNavigate();
    let toregister=()=>navigate('/')
    let exit = () => {
        const token = localStorage.getItem('X-Token');
        axios.get("/sys/logout",{ headers: { 'X-Token': `${token}` } }).then(resp=>{
            console.log(resp.data);
            if(resp.data.code==2){
                message.success(resp.data.message);
                toregister();
            }else{
                message.error(resp.data.message)
            }
        })
    }
    return (
        <Layout>
            <Header className="header">
                <span>LOGO</span>
                <span>新闻管理系统</span>
                <i>管理员 您好！</i>
                <small>管理</small>
                <b onClick={exit}>安全退出</b>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Sider className="site-layout-background" width={200} style={{ height: "100vh" }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                        >
                            <SubMenu key="sub1" title="首页"></SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="栏目管理">
                                <Menu.Item key="5"><Link to="/siderpage/manage/add">添加栏目</Link></Menu.Item>
                                <Menu.Item key="6"><Link to="/siderpage/manage/manage">栏目管理</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined />} title="新闻管理">
                                <Menu.Item key="9"><Link to="/siderpage/news/add/newadd">新闻的添加</Link></Menu.Item>
                                <Menu.Item key="10"><Link to="/siderpage/news/manage/newmanage">新闻管理</Link></Menu.Item>
                                <Menu.Item key="11"><Link to="/siderpage/news/search/newsearch">新闻查询</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>

                        <Outlet></Outlet>
                    </Content>

                </Layout>
            </Content>
        </Layout>
    )

}
