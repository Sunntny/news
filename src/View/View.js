import React from 'react'
import { BrowserRouter as Router, Routes, Route, useParams, Link } from 'react-router-dom'
import Register from '../Register/Register';
import Siderpage from '../Menu/Siderpage';
import Add from '../Menu/Manage/Add'
import Manage from '../Menu/Manage/Manage'
import Newadd from '../Menu/News/Add/Newadd'
import Newmanage from '../Menu/News/Manage/Newmanage'
import Newsearch from '../Menu/News/Search/Newsearch'
import Alter from '../Menu/Manage/Alter'
import Newalter from '../Menu/News/Manage/Newalter'
import Newcheck from '../Menu/News/Manage/Newcheck'
function View() {

  return (
    <Router>

      <Routes>
        <Route path="/" exact element={<Register />}></Route>
        <Route path="/siderpage" exact element={<Siderpage />}>
          <Route path="/siderpage/manage/add" exact element={<Add />}></Route>{/* 栏目管理-添加栏目 */}
          <Route path="/siderpage/manage/manage" exact element={<Manage />}></Route>{/* 栏目管理-栏目管理 */}
          <Route path="/siderpage/manage/alter:id/:name" exact element={<Alter />}></Route>{/* 修改页面 */}
          <Route path="/siderpage/news/add/newadd" exact element={<Newadd />}></Route>
          <Route path="/siderpage/news/manage/newmanage" exact element={<Newmanage />}></Route>
          <Route path="/siderpage/news/manage/newalter/:id" exact element={<Newalter />}></Route>
          <Route path="/siderpage/news/manage/newcheck/:id" exact element={<Newcheck />}></Route>
          <Route path="/siderpage/news/search/newsearch" exact element={<Newsearch />}></Route>
        </Route>
      </Routes>
    </Router>
  )
}
export default View;