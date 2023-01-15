import React, { useState, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Space, Typography, Input, Button } from 'antd';
import axios from 'axios';
import Comments from './Comments';
import Edit from "./Edit.js"
import { useLinkClickHandler, useParams, useNavigate } from 'react-router-dom';
import '../css/Details.css'
const { Title, Text } = Typography;
const { TextArea } = Input;
const Details = () => {
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
  const [isWriter, setIsWriter] = useState([]);
  const {id} = useParams();
  const auth = localStorage.getItem("token")
  const goToHome = useNavigate();
  const goToUpload = useNavigate();

  var getConfig = {
    method: 'get',
    url: `/post/${id}`,
    headers: { 
      'Authorization': `Bearer ${auth}`
    }
  };

  var deleteConfig = {
    method: 'delete',
    url: `/post/${id}`,
    headers: { 
      'Authorization': `Bearer ${auth}`
    }
  }
  useEffect (() => {
    axios(getConfig)
	  .then(function(response) {
      console.log('가져오기 성공')
	    setPosting(JSON.stringify(response.data));
	    setTitle(response.data.title);
	    setContent(response.data.content);
	    setWriter(response.data.writer_nickname);
	    setSubject(response.data.subject);
	    setDivision(response.data.division);
	    setPeopleNum(response.data.people_num);
	    setProceedWay(response.data.proceed_way);
	    setIsProgress(response.data.is_progress);
	    setDate(response.data.modifiedDate);
      setCommentList(response.data.commentList);
      setPostId(response.data.id);
      setIsWriter(response.data.isWriter);
	  })
	  .catch(function (error) {
	    console.log(error);
	  }); 
  }, [])
  const EditPost = () => {
    goToUpload(`/edit/${postId}`)
  }
  const EditButton = isWriter ? (
    <Button onClick={EditPost}>수정하기</Button>
  ) : (null);
  
  const DeletePost = () => {
    axios(deleteConfig)
        .then(response => {
          console.log('게시글 삭제 성공')
          goToHome('/')
        })
        .catch(error => {
            console.error(error);
        });
  }
  const DeleteButton = isWriter ? (
    <Button onClick={DeletePost}>삭제하기</Button>
  ) : (null);
  return (
    <>
    <div className="posting">
      <p className="postingDay">{date}</p>
      <Title level={1} className="postingTitle">{title}</Title>
      <br/>
      <Space align="center">
        <Avatar size={38} icon={<UserOutlined/>}/>
        <Text fontSize={100}>{writer}</Text>
        {EditButton}
        {DeleteButton}
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
      {/* <TextArea readOnly={true} autoSize={{ minRows: 2, maxRows: 6 }} 
                style={{resize: 'none', border:'none', fontSize:'18px'}} value={content}/> */}
      <div dangerouslySetInnerHTML = { {  __html : content } }></div>
      <br/>
      <Divider/>
      <Title level={2} className="postingTitle">댓글</Title>
      <div>
      <Comments commentList={commentList} auth = {auth}/>
      </div>
    </div>
    </>
  );
}
export default Details;