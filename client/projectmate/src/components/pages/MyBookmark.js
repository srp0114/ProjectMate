import React, { useEffect, useState } from 'react';
import { Space, Typography, Divider, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
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
                        <Card hoverable style={{ width: 500 }} key={i} id={info.id} onClick={()=>{goToPost(info.id)}}> 
                            <Meta title={info.title} description={info.modifiedDate}/>
                            <Divider/>                   
                            <Text>{info.subject} [{info.division}] </Text>
                            <Title level={5}>{info.writer_nickname}</Title>
                            <Text>{info.view_count}</Text>                
                        </Card>
                    )
                })}
            </Space>
        </>
    )
}
export default MyBookmark