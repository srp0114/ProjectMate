//import '../css/Details.css';
import './components/css/Details.css'
import {React, useState} from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Space, Typography, Input } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;
const { TextArea } = Input;

function App() {
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
  var config = {
    method: 'get',
    url: 'http://localhost:8080/post/1',
    headers: { }
  };

  axios(config)
  .then(function (response) {
    setPosting(JSON.stringify(response.data));
    setTitle(JSON.stringify(response.data.title));
    setContent(JSON.stringify(response.data.content));
    setWriter(JSON.stringify(response.data.writer));
    setSubject(JSON.stringify(response.data.subject));
    setDivision(JSON.stringify(response.data.division));
    setPeopleNum(JSON.stringify(response.data.people_num));
    setProceedWay(JSON.stringify(response.data.proceed_way));
    setIsProgress(JSON.stringify(response.data.is_progress));
    setDate(JSON.stringify(response.data.modifiedDate));
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  }); 


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
       <p>{posting}</p>
       
      <br/>
      <Divider/>
      <Title level={2} className="postingTitle">댓글</Title>
    </div>
    </>
  );
}

export default App;