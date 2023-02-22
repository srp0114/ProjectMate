import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Divider, Typography, Select, Space, Modal, Input, Button } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import axios from 'axios';
import LoginHeader from '../LoginHeader'
import "../css/Details.css"

const { Title, Text } = Typography;

const subjectData = ['웹프로그래밍기초', '컴퓨터프로그래밍', '컴퓨터구조', '자료구조', '객체지향언어1', '웹프레임워크1', 
                              '가상현실', '웹프레임워크2', '캡스톤디자인', '고급모바일프로그래밍', '데이터베이스설계'];

const divisionData = {
  웹프로그래밍기초: ['A', 'B', 'C', 'N'],
  컴퓨터프로그래밍: ['A', 'B', 'N', '7'],
  컴퓨터구조: ['7', '8', 'A', 'B', 'N'],
  자료구조: ['A', 'B', 'C'],
  객체지향언어1: ['7', '8', '9', 'A', 'B', 'C', 'D', 'N', 'O'],
  웹프레임워크1: ['A', 'B', 'N'],
  가상현실: ['A', 'B', 'N'],
  웹프레임워크2: ['A', 'B', 'N', '1'],
  캡스톤디자인: ['7', '8', 'A', 'B', 'N'],
  고급모바일프로그래밍: ['7', '8', '9', 'A', 'B', 'C', 'D', 'N', 'O'],
  데이터베이스설계: ['A', 'B', 'N'],
};

const peopleNumData = [];
for (let i = 1; i < 11; i++) {
  peopleNumData.push({
    value: i,
    label: i + "명",
  });
}

const Update = () =>  {
  const [title, setTitle] = useState("");
  const [content ,setContent] = useState("");
  const [sub, setSub] = useState("");
  const [div, setDiv] = useState("");
  const [peopleNum, setPeopleNum] = useState(0);
  const [proceedWay, setProceedWay] = useState("");
  const [isProgress, setIsProgress] = useState(1);

  const {id} = useParams();
  const auth = localStorage.getItem("token");

  const navigate = useNavigate();

  var getConfig = {
    method: 'get',
    url: `/post/${id}`,
    headers: { 
      'Authorization': `Bearer ${auth}`
    }
  };

  useEffect(() => {
      const getInfo = async () => {
        const {data} = await axios(getConfig);
        return data;
      }
      
      getInfo().then((response) => {
          setTitle(response.title);
          setContent(response.content);
          setSub(response.subject);
          setDiv(response.division);
          setPeopleNum(response.people_num);
          setProceedWay(response.proceed_way);
          setIsProgress(response.is_progress);
      });
  }, [])
   
  const post = {
    "title":title,
    "content":content,
    "writer_name":localStorage.getItem("token"),
    "subject":sub,
    "division":div,
    "people_num":peopleNum,
    "proceed_way":proceedWay,
    "is_progress":isProgress
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleOk = () => {
    setIsModalOpen(false);
    navigate(`/post/${id}`)
  };

  const goBack = () => {
    navigate(-1);
  }
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updateTitle = (e) => {
    setTitle(e.target.value)
  }

  var config = {
    method: 'put',
    url: `/post/${id}`,
    headers: { 
      'Authorization': `Bearer ${auth}`,
      'Content-Type': 'application/json'
    },
    data : post
  };

  const submit = () => {
    axios(config)
    .then(function (response) {
      showModal()
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const [subject, setSubject] = useState(divisionData[subjectData[0]]);
  const [division, setDivision] = useState(divisionData[subjectData[0]][0]);

  const subjectChange = (value) => {
    setSubject(divisionData[value]);
    setDivision(divisionData[value][0]);
    setSub(value)
  };

  const divisionChange = (value) => {
    setDivision(value);
    setDiv(value); 
  };
  
  return (
    <>
    <div className='header'>
      <LoginHeader nickname={localStorage.getItem('nickname')}/>
    </div>
    <div className="posting">
      <MdOutlineKeyboardBackspace style={{ fontSize: '25px'}} onClick={goBack}/>
      <Title level={2} className='title'>프로젝트 기본정보를 입력해주세요</Title>
        <Title level={5} className='changeFont'>과목명</Title>
        <Select
          key="subject"
          size='large'
          value={sub}
          style={{
            width: 350,
          }}
          onChange={subjectChange}
          options={subjectData.map((subject) => ({
            label: subject,
            value: subject,
          }))}
        />
        <Title level={5} className='changeFont'>분반</Title>
        <Select
          size='large'
          value={div}
          style={{
            width: 350,
          }}
          onChange={divisionChange}
          options={subject.map((division) => ({
            label: division,
            value: division,
          }))}
        />
        <Title level={5} className='changeFont'>모집인원</Title>
        <Select
          size='large'
          value={peopleNum}
          style={{
            width: 350,
          }}
          onChange={(value) => 
            setPeopleNum(value)
          }
          options={peopleNumData}
        />
        <Title level={5} className='changeFont'>모집여부</Title>
        <Select
          size='large'
          value={proceedWay}
          style={{
            width: 350,
          }}
          onChange={(value) => 
            setProceedWay(value)
          }
          options={[
            {
              value: '모집마감',
              label: '모집마감',
            },
            {
              value: '모집중',
              label: '모집중',
            },
          ]}
        />
        <Title level={5} className='changeFont'>모집여부</Title>
        <Select
          size='large'
          value={isProgress}
          style={{
            width: 350,
          }}
          onChange={(value) => 
            setIsProgress(value)
          }
          options={[
            {
              value: 1,
              label: '모집중',
            },
            {
              value: 0,
              label: '모집마감',
            },
          ]}
        />
      <Divider/>
      <Title level={2} className='title'>프로젝트를 소개해주세요</Title>
      <Title level={5}>제목</Title>
      <Input size="large" name="title" value={title} onChange={updateTitle}/> 
      <br/>
      <br/>
      <CKEditor
          editor={ ClassicEditor }
          data={content}
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              setContent(data)
          } }
      />
      <br/>
      <Button onClick={submit} size="large">수정하기</Button>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>게시글 수정이 완료되었습니다.</p>
      </Modal>
      <br/>
      <br/>
      <br/>
    </div>
    </>
  );
}

export default Update;