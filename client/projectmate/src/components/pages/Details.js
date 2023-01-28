import React, { useState, useEffect } from 'react';
import { SecurityScanTwoTone, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Space, Typography, Input, Button, Modal } from 'antd';
import axios from 'axios';
import Comments from './Comments';
import { useLinkClickHandler, useParams, useNavigate } from 'react-router-dom';
import { BsBookmarkStar, BsFillBookmarkStarFill } from 'react-icons/bs'
import '../css/Details.css'

const { Title, Text } = Typography;

const Details = () => {
  const [posting, setPosting] = useState([]);
  const [title, setTitle] = useState([]);
  const [content ,setContent] = useState([]);
  const [writerName, setWriterName] = useState([]);
  const [subject, setSubject] = useState([]);
  const [division, setDivision] = useState([]);
  const [peopleNum, setPeopleNum] = useState([]);
  const [proceedWay, setProceedWay] = useState([]);
  const [isProgress, setIsProgress] = useState([]);
  const [date, setDate] = useState([]);
  const [postId, setPostId]= useState();
  const [commentList, setCommentList] = useState([]);
  const [isWriter, setIsWriter] = useState([]);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {id} = useParams();
  const auth = localStorage.getItem("token")

  const goToHome = useNavigate();
  const goToUpdate = useNavigate();

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
  
  var postConfig = {
    method: 'post',
    url: `/post/bookmark/${id}`,
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
	    setWriterName(response.data.writer_nickname);
	    setSubject(response.data.subject);
	    setDivision(response.data.division);
	    setPeopleNum(response.data.people_num);
	    setProceedWay(response.data.proceed_way);
	    setIsProgress(response.data.is_progress);
	    setDate(response.data.modifiedDate);
      setCommentList(response.data.commentList);
      setPostId(response.data.id);
      setIsWriter(response.data.isWriter);
      setIsBookmark(response.data.isBookmarked);
	  })
	  .catch(function (error) {
	    console.log(error);
	  }); 
  }, [])

  var userID = localStorage.getItem("id")
  var studentID = userID.slice(0,2);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    goToHome('/')
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const handleBookmark = () => {
    axios(postConfig)
    .then((response) => {
      console.log(isBookmark + "!!!!!!")
      axios(getConfig)
      .then(response => {
        setIsBookmark(response.data.isBookmarked);
      })
    })
    .catch((error) => {
      console.log(error)
    })
  };

  const UpdatePost = () => {
    goToUpdate(`/update/${postId}`)
  }

  const UpdateButton = isWriter ? (
    <Button onClick={UpdatePost}>수정하기</Button>
  ) : (null);

  const DeletePost = () => {
    axios(deleteConfig)
        .then(response => {
          console.log('게시글 삭제 성공');
          showModal()
        })
        .catch(error => {
            console.error(error);
        });
  }
  
  const DeleteButton = isWriter ? (
    <>
    <Button onClick={DeletePost}>삭제하기</Button>
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <p>게시글이 삭제되었습니다</p>
    </Modal>
    </>
  ) : (null);

  const BookmarkButton = isBookmark ? (
    <BsFillBookmarkStarFill size={25} onClick={handleBookmark}/>
  ) : ( <BsBookmarkStar size={25} onClick={handleBookmark}/> ) 

  return (
    <>
    <div className="posting">
      <p className="postingDay">{date}</p>
      <Title level={1} className="postingTitle">{title}</Title>
      <br/>
      <Space align="center">
        <Avatar size={38} icon={<UserOutlined/>}/>
        <Text fontSize={100}>{writerName} ({studentID})</Text>
        {UpdateButton}
        {DeleteButton}
        {BookmarkButton}
      </Space>
      <Divider/>
      <div className="postingInfo">
      <Space align="center" size={220}>
        <Space align="center" size={70}>
          <Title level={4}>과목명</Title>
          <Title level={4}>{subject}</Title>
        </Space>
        <Space align="center" size={150}>
          <Title level={4}>분반</Title>
          <Title level={4}>{division}</Title>
        </Space>
      </Space>
      <Space align="center" size={247}>
        <Space align="center" size={100}>
          <Title level={4}>모집인원</Title>
          <Title level={4}>{peopleNum}명</Title>
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