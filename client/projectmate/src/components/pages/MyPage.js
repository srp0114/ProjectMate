import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Space, Typography, Divider, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import MyInfo from "./MyInfo"
import MyWriting from "./MyWriting.js"
import MyBookmark from "./MyBookmark"
import MyComment from "./MyComment"
import LoginHeader from '../LoginHeader';
import Header from '../Header';
import "../css/MyPage.css";

const { Title, Text } = Typography;

const MyPage = () => {
    const nickname = localStorage.getItem('nickname')
    const [myPage, setMyPage] = useState()
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <>
            <div className='header'>
                <LoginHeader nickname={localStorage.getItem('nickname')}/>
            </div>
            
            <div className="myInfoPage">
            <div className="goBack">
            <MdOutlineKeyboardBackspace style={{ fontSize: '25px'}} onClick={goBack}/>
            </div>
            <Space direction='vertical' className="myInfoMenu">
                <Space className="userInfo">
                <Avatar size={35} icon={<UserOutlined />}/>
                <Text level={4}>{nickname}</Text>
                </Space>
                <Text className='change-profile'>프로필 편집하기</Text>
                <Divider style={{height:"100%"}}/>
                <Title level={4} onClick={() => setMyPage(<MyInfo/>)}>내 정보</Title>
                <Title level={4} onClick={() => setMyPage(<MyWriting/>)}>작성한 글</Title>
                <Title level={4} onClick={() => setMyPage(<MyComment/>)}>댓글단 글</Title>
                <Title level={4} onClick={() => setMyPage(<MyBookmark/>)}>북마크한 글</Title>
            </Space>
            {myPage}
            </div>
        </>
    )
}
export default MyPage