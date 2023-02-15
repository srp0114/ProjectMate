import React, {useCallback, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoPerson}  from 'react-icons/io5'
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import { BsPerson, BsBookmarkStar} from "react-icons/bs"
import { Typography, Menu, Button } from 'antd';
import { HomeOutlined, HomeFilled } from '@ant-design/icons';
import "./css/Home.css"

const { Title } = Typography;

const LoginHeader_Home=(props)=>{
    const EXPIRY_TIME = 1 * 3600 * 1000;                //로그인 세션 유지 시간.
    let loginTime = localStorage.getItem('login-time'); 
    let nowTime = Date.now();

    const [isOpen, setIsOpen]=useState(false);

    const goToMyPage = useNavigate();

    const goMyPage = e =>{
        goToMyPage('/mypage')
    }

    const openMyPage=()=>{
        const open = isOpen
        setIsOpen(!open)
    }

    const expiryLogin = useCallback(() =>{
        if(nowTime-loginTime > EXPIRY_TIME)         //1시간이 지나면 클리어
        {
            props.logOut();
        }
    });

    useEffect(()=>{
        expiryLogin()
    },[expiryLogin])

   
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/')
    }

    return(
        <>
            <div className="homeBtn">
            <HomeOutlined style={{ fontSize: '30px' }} onClick={goToHome}/>
            </div>
            <div className='menu'>
                <button onClick={openMyPage} className='profile-btn'><IoPerson size='30'/><span className='profile-nickname'>{props.nickname}</span></button>
                {isOpen &&<Menu mode="vertical">
                    <Link to={{
                        pathname : `/mypage`,
                        state:{
                            islogin :true,
                        }
                    }}
                        style={{ textDecoration: "none" }}>
                        <Menu.Item className='list-component'style={{ lineHeight : "10px", padding : '5px'  }}><Title level={4} style={{ margin: '0px'}}><BsPerson size="25" viewBox='0 -2 16 16' style={{ margin:"0px 7px 0px 0px"}}/>내정보</Title></Menu.Item>
                    </Link>
                    <Menu.Item className='list-component' style={{ lineHeight : "10px", padding : '5px'  }}><Title level={4} style={{ margin: '0px' }}><AiOutlineEdit viewBox="0 -110 1024 1024" size="25" style={{ margin:"0px 7px 0px 0px" }}/>작성한 글</Title></Menu.Item>
                    <Menu.Item className='list-component' style={{ lineHeight : "10px", padding : '5px'  }}><Title level={4} style={{ margin: '0px' }}><BsBookmarkStar size="25" style={{ margin:"0px 7px 0px 0px" }}/>북마크한 글</Title></Menu.Item>
                    <Menu.Item className='list-component' onClick={props.logOut} style={{ lineHeight : "10px", padding : '5px'  }}><Title level={4} style={{ margin: '0px', padding : "0px" }}><HiOutlineLogout size="25" viewBox='0 -3 24 24' style={{ margin:"0px 7px 0px 0px" }}/><span className='login-texts'>로그아웃</span></Title></Menu.Item>
                </Menu>}
            </div>
            </>
    );
}

export default LoginHeader_Home;