import React, { useEffect, useState } from 'react';
import { Space, Typography, Card, Divider, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import axios from "axios";
import "../css/MyPage.css";

const { Title, Text } = Typography;
const { Meta } = Card;

const MyWriting = () => {
    
    const auth = localStorage.getItem("token")
    const [myWriting, setMyWriting] = useState([]);

    var config = {
        method: 'get',
        url: `/member/posts`,
        headers: { 
          'Authorization': `Bearer ${auth}`
        }
    };

    useEffect (() => {
        axios(config)
            .then(function(response) {
                setMyWriting(response.data.content)
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

    const haveWriting = (myWriting != false) ? (
        myWriting.map((info, i) => {
            return (
                <Card className="card" hoverable style={{width:650}} key={i} id={info.id} onClick={()=>{goToPost(info.id)}}> 
                    <Tag color="processing" style={{fontSize:16, padding: 3}}>#{info.subject} </Tag>
                    <Tag color="processing" style={{fontSize:16, padding: 3}}>#{info.division} </Tag>
                    <Title level={4}> {info.title} </Title >
                    <Text level={5}>{info.modifiedDate}</Text>
                    <Divider/>                   
                    <Title level={5} className='text'>{info.comment_count}</Title> 
                    <HiOutlineChatBubbleLeftRight size="30" className="icon"/>
                    <Title level={5} className="text">{info.view_count}</Title> 
                    <AiOutlineEye size="30" className="icon"/>      
                </Card>
            )
        })
    ) : (<Title className="noItem" level={3}>작성한 글이 없습니다.</Title>)


    return (
        <>            
            <Space direction='vertical' className="myInfo">
            <Title level={4}>작성한 글</Title>
            {haveWriting}
            </Space>
        </>
    )
}
export default MyWriting