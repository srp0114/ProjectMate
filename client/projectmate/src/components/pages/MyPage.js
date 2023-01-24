import { React, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Space, Typography, Divider, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import MyInfo from "./MyInfo"
import MyWriting from "./MyWriting.js"
import MyBookmark from "./MyBookmark"
import MyComment from "./MyComment"
import LoginHeader from '../LoginHeader';
import Header from '../Header';
import "../css/MyPage.css";

const { Title } = Typography;

const MyPage = () => {
    const nickname = localStorage.getItem('nickname')

    const [myInfo, setMyInfo] = useState()

    const location = useLocation();

    console.log(location);
    return (
        <>
            <div className='header'>
                {location.isLogin ? <LoginHeader nickname={localStorage.getItem('nickname')}/> : <Header/>}
            </div>
            <div className="myInfoPage">
            <Space direction='vertical' className="myInfoMenu">
                <Avatar size={55} icon={<UserOutlined />}/>
                <Title level={5}>{nickname}</Title>
                <Title level={4} className='change-profile'>프로필 편집하기</Title>
                <Divider style={{height:"100%"}}/>
                <Title level={4} onClick={() => setMyInfo(<MyInfo/>)}>내 정보</Title>
                <Title level={4} onClick={() => setMyInfo(<MyWriting/>)}>작성한 글</Title>
                <Title level={4} onClick={() => setMyInfo(<MyComment/>)}>댓글단 글</Title>
                <Title level={4} onClick={() => setMyInfo(<MyBookmark/>)}>북마크한 글</Title>
            </Space>
            {myInfo}
            </div>
        </>
    )
}

export default MyPage