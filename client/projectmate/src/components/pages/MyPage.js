import { React, useState } from 'react';
import { Space, Typography, Divider, Avatar, Button, Row, Col} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import MyInfo from "../layout/MyInfo"
import MyWriting from "../layout/MyWriting.js"
import MyBookmark from "../layout/MyBookmark"
import MyComment from "../layout/MyComment"
import LoginHeader from '../Headers/LoginHeader'
import "../css/MyPage.css";

const { Title, Text } = Typography;

const MyPage = () => {
    const localNickname = localStorage.getItem('nickname')
    const [nickname, setNickname] = useState(localNickname)
    const [MyPage, setMyPage] = useState()

    return (
        <>
            <div className='header'>
                <LoginHeader nickname={nickname}/>
            </div>
            
            <div className="myInfoPage">
                <Row className="myPage">
                    <Col flex="30%">
                        <Space direction="vertical" className="myInfoMenu">
                            <Space direction="horiziontal">
                            <Avatar size={35} icon={<UserOutlined />}/>
                            <Title level={5} className="myInfoNickname" >{nickname}</Title>
                            </Space>
                            <Text className='change-profile'>프로필 편집하기</Text>
                            <Divider style={{height:"100%"}}/>
                            <Button className="myInfoBtn" type="text" size="large" onClick={() => setMyPage(<MyInfo/>)}>내 정보</Button>
                            <Button className="myInfoBtn" type="text" size="large" onClick={() => setMyPage(<MyWriting/>)}>작성한 글</Button>
                            <Button className="myInfoBtn" type="text" size="large" onClick={() => setMyPage(<MyComment/>)}>댓글단 글</Button>
                            <Button className="myInfoBtn" type="text" size="large" onClick={() => setMyPage(<MyBookmark/>)}>북마크한 글</Button>
                        </Space>
                    </Col>
                    <Col flex="auto" className="choosePage">{MyPage}</Col>
                </Row>
            </div>
        </>
    )
}
export default MyPage