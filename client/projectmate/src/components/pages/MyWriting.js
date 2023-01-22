import React from 'react';
import { Space, Typography, Divider, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import PostThumbnail2 from '../PostThumbnail2';
import "../css/MyPage.css";

const { Title } = Typography;

const MyWriting = () => {
    const nickname = localStorage.getItem('nickname')
    const id = localStorage.getItem('id')

    return (
        <>            
            <Space direction='vertical' className="myInfo">
                <Title level={3}>작성한 글</Title>
                    <div className='mypage-post-container'>
                        <PostThumbnail2/>
                        <PostThumbnail2/>
                    </div>
            </Space>
        </>
    )
}

export default MyWriting