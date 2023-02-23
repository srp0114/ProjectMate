import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Divider, Typography, Select, Modal, Space, Input, Button } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import axios from 'axios';
import LoginHeader from '../Headers/LoginHeader'
import "../css/Details.css"

const { Title, Text } = Typography;

const subjectData = [ '웹프로그래밍기초', '컴퓨터프로그래밍', 
                      '컴퓨터구조', '자료구조', '객체지향언어1', 
                      '웹프레임워크1', '가상현실', '고급모바일프로그래밍', '데이터베이스설계',
                      '웹프레임워크2', '캡스톤디자인' ];

const divisionData = {
  웹프로그래밍기초: ['A', 'B', 'C', 'N'],
  컴퓨터프로그래밍: ['A', 'B', 'N', '7'],
  컴퓨터구조: ['7', '8', 'A', 'B', 'N'],
  자료구조: ['A', 'B', 'C'],
  객체지향언어1: ['7', '8', '9', 'A', 'B', 'C', 'D', 'N', 'O'],
  웹프레임워크1: ['A', 'B', 'N'],
  가상현실: ['A', 'B', 'N'],
  웹프레임워크2: ['A', 'B', 'N', '7'],
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

const Upload = () => {
  const [post, setPost] = useState({
    "title":'',
    "content":'',
    "writer_nickname":localStorage.getItem("nickname"),
    "subject":'',
    "division":'',
    "people_num":0,
    "proceed_way":'',
    "is_progress":1
  })

  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = localStorage.getItem("token")
  const navigate = useNavigate();

  var config = {
    method: 'post',
    url: `/post`,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth}`
    },
    data : post
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const goBack = () => {
    navigate(-1);
  }

  const submit = () => {
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      showModal()
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const getValue = e => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value
    })
  };

  const [subject, setSubject] = useState(divisionData[subjectData[0]]);
  const [division, setDivision] = useState(divisionData[subjectData[0]][0]);

  const subjectChange = (value) => {
    setSubject(divisionData[value]);
    setDivision(divisionData[value][0]);
    setPost({
      ...post,
      ["subject"]: value
    })  
  };

  const divisionChange = (value) => {
    setDivision(value);
    setPost({
      ...post,
      ["division"]: value
    }) 
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
          defaultValue="과목명"
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
          defaultValue='분반'
          style={{
            width: 350,
          }}
          onChange={divisionChange}
          options={subject.map((division) => ({
            label: division,
            value: division,
          }))}
        />
        <Title level={5}>모집인원</Title>
        <Select
          size='large'
          defaultValue='인원'
          style={{
            width: 350,
          }}
          onChange={(value) => setPost({
            ...post,
            ["people_num"]: value
          })}
          options={peopleNumData}
        />
         <Title level={5} className='changeFont'>진행방식</Title>
         <Select
           size='large'
           defaultValue='진행방식'
           style={{
             width: 350,
           }}
          onChange={(value) => setPost({
            ...post,
            ["proceed_way"]: value
           })}
           options={[
             {
               value: '오프라인',
               label: '오프라인',
             },
             {
               value: '온라인',
               label: '온라인',
             },
           ]}
         />
      <Divider/>
      <Title level={2} className='title'>프로젝트를 소개해주세요</Title>
      <Input size="large" name="title" onChange={getValue} placeholder="제목을 입력해주세요." /> 
      <br/>
      <br/>
      <CKEditor
          editor={ ClassicEditor }
          defaultValue="내용을 입력해주세요."
          onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              console.log( { event, editor, data } );
              setPost({
                ...post,
                content: data
              })
          } }
          onBlur={ ( event, editor ) => {
              console.log( 'Blur.', editor );
          } }
          onFocus={ ( event, editor ) => {
              console.log( 'Focus.', editor );
          } }
      />
      <br/>
      <Button onClick={submit} size="large">작성하기</Button>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p className='changeFont'><b>게시글 작성이 완료되었습니다.</b></p>
      </Modal>
      <br/>
      <br/>
      <br/>
    </div>
    </>
  );
}

export default Upload;