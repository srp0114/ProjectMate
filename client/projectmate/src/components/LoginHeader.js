import React, {useCallback, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import { BsPerson, BsBookmarkStar} from "react-icons/bs"
import { useCookies } from 'react-cookie';
import { Typography, Menu, Avatar } from 'antd';
import { HomeOutlined, UserOutlined } from "@ant-design/icons"
import "./css/Home.css"
const { Title } = Typography;

const LoginHeader=(props)=>{
    const EXPIRY_TIME = 1 * 3600 * 1000;                //로그인 세션 유지 시간.
    let loginTime = localStorage.getItem('login-time'); 
    let nowTime = Date.now();

    const [cookies, removeCookie] = useCookies();
    const [isOpen, setIsOpen]=useState(false);

    const goToMyPage = useNavigate();

    const goMyPage = e =>{
        goToMyPage('/mypage')
    }

    const openMyPage=()=>{
        const open = isOpen
        setIsOpen(!open)
    }

    const logOut = () =>{
        localStorage.clear();
        removeCookie('postView');
        goToMyPage('/');
    }

    const expiryLogin = useCallback(() =>{
        if(nowTime-loginTime > EXPIRY_TIME)         //1시간이 지나면 클리어
        {
            logOut();
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
            <img src='/projectmateLogo.png' onClick={goToHome} width={210} height={60} className='homeBtn'/>
            <div className='menu'>
                <button onClick={openMyPage} className='profile-btn'><Avatar size={40} icon={<UserOutlined/>}/>
                <span className='profile-nickname'>{props.nickname}</span></button>
                {isOpen &&<Menu mode="vertical">
                <Link to={{
                        pathname : `/mypage`, 
                        state:{
                            islogin :true,
                        }                        
                    }}
                        style={{ textDecoration: "none" }}>
                    <Menu.Item className='list-component'style={{ lineHeight : "10px", padding : '5px'  }}>
                        <Title level={4} className="menuBar" >
                        <BsPerson size="25" viewBox='0 -2 16 16' style={{ margin:"0px 7px 0px 0px"}}/>내 정보</Title>
                    </Menu.Item>
                    <Menu.Item className='list-component' style={{ lineHeight : "10px", padding : '5px'  }}>
                        <Title level={4} className="menuBar">
                        <AiOutlineEdit viewBox="0 -110 1024 1024" size="25" style={{ margin:"0px 7px 0px 0px" }}/>작성한 글</Title>
                    </Menu.Item>
                    <Menu.Item className='list-component' style={{ lineHeight : "10px", padding : '5px'  }}>
                        <Title level={4} className="menuBar">
                        <BsBookmarkStar size="25" style={{ margin:"0px 7px 0px 0px" }}/>북마크한 글</Title>
                    </Menu.Item>
                </Link>
                <Menu.Item className='list-component' onClick={logOut} style={{ lineHeight : "10px", padding : '5px'  }}>
                    <Title level={4} className="menuBar">
                    <HiOutlineLogout size="25" viewBox='0 -3 24 24' style={{ margin:"0px 7px 0px 0px" }}/>
                    <span className='login-texts'>로그아웃</span></Title>
                </Menu.Item>
                </Menu>}
            </div>
            </>
    );
}

export default LoginHeader;