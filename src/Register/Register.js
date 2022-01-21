import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { message, Button } from 'antd';
import './Register.css'
import Avatar from '../test'
export default function Register() {
    const inputref = useRef();
    const txtref = useRef();
    let navigate = useNavigate();
    //code=3de 提示框
    const info = () => {
        message.info('账号或密码不能为空');
    };
    //code=4的时候
    const infomation = () => {
        message.info('账号或密码错误');
    };
    let demo = () => navigate("/siderpage")
    let login = () => {
        axios.post("/sys/login", `username=${inputref.current.value}&password=${txtref.current.value}`).then(resp => {
            console.log(resp);
            if (resp.data.code == 2) {
                localStorage.setItem("X-Token",resp.data.data.token)
                demo();
                console.log(resp.data.data.token);

            } else if (resp.data.code == 3) {
                info()
            } else if (resp.data.code == 4) {
                infomation()
            }

        })
    }

    return (
        <div>
        <Avatar></Avatar>
        <div className='register'>
            
            <h1>新闻管理系统</h1>
           
            <span>
                用户名:<input ref={inputref}></input>
            </span>
            <span>
                密码:<input ref={txtref}></input>
            </span>
            <span onClick={login}>登录</span>
        </div>
        </div>
    )
}


