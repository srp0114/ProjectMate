import '../css/Details.css'
import {React, useState, useEffect} from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Space, Typography, Input, Button } from 'antd';
import axios from 'axios';
import Comments from './Comments';
import { useLinkClickHandler } from 'react-router-dom';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Details=()=> {
  const [posting, setPosting] = useState([]);
  const [title, setTitle] = useState([]);
  const [content ,setContent] = useState([]);
  const [writer, setWriter] = useState([]);
  const [subject, setSubject] = useState([]);
  const [division, setDivision] = useState([]);
  const [peopleNum, setPeopleNum] = useState([]);
  const [proceedWay, setProceedWay] = useState([]);
  const [isProgress, setIsProgress] = useState([]);
  const [date, setDate] = useState([]);
  const [postId, setPostId]= useState();
  const [commentList, setCommentList] = useState([]);
  
  const {id} = useParams();

  var config = {
    method: 'get',
    url: `/post/${id}`,
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
  };

  useEffect (() => {
    console.log(localStorage.getItem("token"))
    axios(config)
	  .then(function(response) {
      console.log('가져오기성공')
	    setPosting(JSON.stringify(response.data));
	    setTitle(response.data.title);
	    setContent(response.data.content);
	    setWriter(response.data.writer);
	    setSubject(response.data.subject);
	    setDivision(response.data.division);
	    setPeopleNum(response.data.people_num);
	    setProceedWay(response.data.proceed_way);
	    setIsProgress(response.data.is_progress);
	    setDate(response.data.modifiedDate);
      setCommentList(response.data.commentList);
      setPostId(response.data.id);
	  })
	  .catch(function (error) {
	    console.log(error);
	  }); 
  }, [])

  return (
    <>
    <div className="posting">
      <p className="postingDay">{date}</p>
      <Title level={1} className="postingTitle">{title}</Title>
      <br/>
      <Space align="center">
        <Avatar size={38} icon={<UserOutlined/>}/>
        <Text fontSize={100}>{writer}</Text>
      </Space>
      <Divider/>
      <div className="postingInfo">
        <Space align="center" size={300}>
          <Space align="center" size={100}>
            <Title level={4}>과목명</Title>
            <Title level={4}>{subject}</Title>
          </Space>
          <Space align="center" size={135}>
            <Title level={4}>분반</Title>
            <Title level={4}>{division}</Title>
          </Space>
        </Space>
        <Space align="center" size={357}>
          <Space align="center" size={85}>
            <Title level={4}>모집인원</Title>
            <Title level={4}>{peopleNum}</Title>
          </Space>
          <Space align="center" size={100}>
            <Title level={4}>진행방식</Title>
            <Title level={4}>{proceedWay}</Title>
          </Space>
        </Space>
      </div>
      <Divider style={{ borderWidth: 5, borderColor: 'grey' }}  />
      <br/>
      <br/>
      <TextArea readOnly={true} autoSize={{ minRows: 2, maxRows: 6 }} 
                style={{resize: 'none', border:'none', fontSize:'18px'}} value={content}/>
      <br/>
      <Divider/>
      <Title level={2} className="postingTitle">댓글</Title>
      <div>
        <Comments commentList={commentList} auth = {auth}/>
      </div>
      <Button>삭제하기</Button>
    </div>
    </>
  );
}

export default Details;