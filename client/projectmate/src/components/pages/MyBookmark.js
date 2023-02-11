import React, { useEffect, useState } from 'react';
import { Space, Typography, Divider, Card, Tag, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import axios from 'axios';
import "../css/MyPage.css";

const { Title, Text } = Typography;
const { Meta } = Card;

const MyBookmark = () => {
    const auth = localStorage.getItem("token")
    const [myBookmark, setMyBookmark] = useState([]);
    var config = {
        method: 'get',
        url: `/member/bookmark-posts`,
        headers: { 
          'Authorization': `Bearer ${auth}`
        }
    };
    useEffect (() => {
        axios(config)
            .then(function(response) {
                setMyBookmark(response.data.content)
                console.log(response.data.content)
          })
          .catch(function (error) {
                console.log(error);
          }); 
      }, [])
    
    const navigate = useNavigate();

    const goToPost = (id) => {
        navigate(`/post/${id}`)
    }

    return (
        <>            
            <Space direction='vertical' className="myInfo">
                <Title level={4}>북마크한 글</Title>
                {myBookmark.map((info, i) => {
                    return (
                        <Card className="card" hoverable style={{width:650}} key={i} id={info.id} onClick={()=>{goToPost(info.id)}}> 
                            <Tag color="processing" style={{fontSize:16, padding: 3}}>#{info.subject} </Tag>
                            <Tag color="processing"  style={{fontSize:16, padding: 3}}>#{info.division} </Tag>
                            <Title level={4}> {info.title} </Title >
                            <Text level={5}>{info.modifiedDate}</Text>
                            <Divider/> 
                            <Row>
                                <Col span={12}><Title level={5} className="poster">{info.writer_nickname}</Title> </Col>
                                <Col span={12}><Title level={5} className='text'>{info.comment_count}</Title> <HiOutlineChatBubbleLeftRight size="30" className="icon"/>
                                <Title level={5} className="text">{info.view_count}</Title> <AiOutlineEye size="30" className="icon"/></Col>
                            </Row>
                        </Card>
                    )
                })}
            </Space>
        </>
    )
}
export default MyBookmark