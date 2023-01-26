import React from 'react';
import { Space, Typography, Divider, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "../css/MyPage.css";

const { Title } = Typography;

const MyBookmark = () => {
    const nickname = localStorage.getItem('nickname')
    const id = localStorage.getItem('id')

    return (
        <>            
            <Space direction='vertical' className="myInfo">
                <Title level={3}>북마크한 글</Title>
                <Space direction='vertical' className="info">
                <Title level={5}>{nickname}</Title>
                <Title level={5}>{id}</Title>
                <Title level={5}>200@hansung.ac.kr</Title>
                <Title level={5}>변경하기</Title>
                </Space>
            </Space>
        </>
    )
}

export default MyBookmark