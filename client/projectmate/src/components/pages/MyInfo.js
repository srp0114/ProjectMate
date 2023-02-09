import React from 'react';
import { Space, Typography, Divider, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "../css/MyPage.css";

const { Title, Text } = Typography;

const MyInfo = () => {
    const nickname = localStorage.getItem('nickname')
    const id = localStorage.getItem('id')
    const email = localStorage.getItem('email')

    const ChangeNickname = () => {

    }
    
    const ChangePassword = () => {
        
    }

    return (
        <>      
            <Space direction='vertical' className="myInfoTab">
                <Title level={4}>내 정보</Title>
                <Space direction='horizontal'>
                    <Space direction='vertical'>
                    <Title level={5}>닉네임</Title>
                    <Title level={5}>학번</Title>
                    <Title level={5}>이메일</Title>
                    <Title level={5}>비밀번호</Title>
                    </Space>
                    <Space direction='vertical' className="info">
                    <Space direction='horizontal' size="large">
                    <Title level={5}>{nickname} </Title>
                    <Title level={5}style={{ color: '#1677FF' }} onClick={ChangeNickname} >변경하기</Title>
                    </Space>
                    <Title level={5}>{id}</Title>
                    <Title level={5}>{email}</Title>
                    <Title level={5}style={{ color: '#1677FF' }} onClick={ChangePassword} >변경하기</Title>
                    </Space>
                        
                </Space>
            </Space>
        </>
    )
}
export default MyInfo