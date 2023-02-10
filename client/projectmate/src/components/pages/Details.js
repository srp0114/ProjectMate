import React, { useState, useEffect } from 'react';
import { SecurityScanTwoTone, UserOutlined, HomeOutlined, HomeFilled } from '@ant-design/icons';
import { Avatar, Divider, Space, Typography, Input, Button, Modal, Row, Col } from 'antd';
import axios from 'axios';
import Comments from './Comments';
import LoginHeader from '../LoginHeader'
import { useLinkClickHandler, useParams, useNavigate, useHistory } from 'react-router-dom';
import { BsBookmarkStar, BsFillBookmarkStarFill } from 'react-icons/bs';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import '../css/Details.css';

const { Title, Text } = Typography;

const Details = () => {
  const [posting, setPosting] = useState([]);
  const [title, setTitle] = useState([]);
  const [content ,setContent] = useState([]);
  const [writerName, setWriterName] = useState([]);
  const [writerID, setWriterID] = useState([]);
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
  const [bookmarkCount, setBookmarkCount] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {id} = useParams();
  const auth = localStorage.getItem("token")

  const navigate = useNavigate();
  
  var getConfig = {
    method: 'get',
    url: `/post/${id}`,
    headers: { 
      'Authorization': `Bearer ${auth}`
    }
  };
  
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
      setWriterID(response.data.writer_id);
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
      setBookmarkCount(response.data.bookmark_count);
	  })
	  .catch(function (error) {
	    console.log(error);
	  }); 
  }, [])

  var ID = writerID.slice(0,2);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    navigate('/')
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
        setBookmarkCount(response.data.bookmark_count)
      })
    })
    .catch((error) => {
      console.log(error)
    })
  };

  const UpdatePost = () => {
    navigate(`/update/${postId}`)
  }

  const UpdateButton = isWriter ? (
    <Button onClick={UpdatePost}>수정하기</Button>
  ) : (null);

  var deleteConfig = {
    method: 'delete',
    url: `/post/${id}`,
    headers: { 
      'Authorization': `Bearer ${auth}`
    }
  }

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

  const goBack = () => {
    navigate(-1);
  }

  const getComments=async ()=>{
    var config = {
        method: `get`,
        url: `/post/${postId}`,           //게시글 id
        headers: { 
          'Authorization': `${auth}`,
          'Content-Type': 'application/json'
        },
    };
    //답글
    await axios(config).then((response)=>{
        setCommentList(response.data.commentList);
    })
  };

  return (
    <>
    <div className='header'>
      <LoginHeader nickname={localStorage.getItem('nickname')}/>
    </div>
    <div className="posting">
      <MdOutlineKeyboardBackspace style={{ fontSize: '25px'}} onClick={goBack}/>
      <p className='postingDay'>{date}</p> 
      <Text className="deleteBtn">{DeleteButton}</Text>
      <Text className="updateBtn">{UpdateButton}</Text>
      <Title level={1} className="postingTitle">{title}</Title>
      <Avatar size={38} icon={<UserOutlined/>} className="userProfile"/>
      <Text>{writerName} ({ID})</Text>
      <Text className="bookmarkCnt">{bookmarkCount}</Text>
      <Text className="bookmarkBtn">{BookmarkButton}</Text>
      <Divider/>
      <div className="postingInfo">
      <Row>
        <Col span={3}><Title level={4} className="try">과목명</Title></Col>
        <Col span={6}><Title level={4}>{subject}</Title></Col>
        <Col span={3}> <Title level={4} className="try">분반</Title></Col>
        <Col span={6}><Title level={4}>{division}</Title></Col>
      </Row>
      <Row>
        <Col span={3}> <Title level={4} className="try">모집인원</Title></Col>
        <Col span={6}> <Title level={4}>{peopleNum}명</Title></Col>
        <Col span={3}><Title level={4} className="try">진행방식</Title></Col>
        <Col span={6}><Title level={4}>{proceedWay}</Title></Col>
      </Row>
      </div>
      <Divider style={{ borderWidth: 5, borderColor: 'grey' }}  />
      <br/>
      {/* <TextArea readOnly={true} autoSize={{ minRows: 2, maxRows: 6 }} 
                style={{resize: 'none', border:'none', fontSize:'18px'}} value={content}/> */}
      <div dangerouslySetInnerHTML = { {  __html : content } } className="postingContent"></div>
      <br/>
      <Divider/>
      <Title level={3} className="postingTitle">댓글</Title>
      <div>
      <Comments commentList={commentList} auth = {auth} postId = {postId} getComments={getComments}/>
      </div>
    </div>
    </>
  );
}
export default Details;