import { React, useState } from 'react';
import { Link } from 'react-router-dom'
import { Space, Typography, Divider, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AiOutlineEye } from 'react-icons/ai';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import {IoPerson} from 'react-icons/io5'
import "./css/MyPage.css";

const PostThumbnail2 = (props) =>{

    const { Title } = Typography;

    return(
        <>
        <div className='mypage-post'>
            <div className='mypage-post-header'>
                <h1 className='mypage-post-title'><span>제목</span></h1>
            </div>
                <h1 className='mypage-post-date'><span>날짜</span></h1>
            <div className='mypage-post-content'>content</div>
            <div className='mypage-post-footer'><IoPerson size="30"/><span className='owner-name'>유저 1</span></div>
        </div>
        </>
    );
}

export default PostThumbnail2;  