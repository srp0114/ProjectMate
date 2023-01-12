import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Divider, Typography, Select, Space, Input, Button } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import "../css/Details.css"

const { Title, Text } = Typography;

const subjectData = ['웹프레임워크1', '캡스톤디자인', '고급모바일프로그래밍', '데이터베이스설계'];
const divisionData = {
  웹프레임워크1: ['A', 'B', 'N'],
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

function App() {

  const [post, setPost] = useState({
    "title":'',
    "content":'',
    "writer":'writer',
    "subject":'',
    "division":'',
    "people_num":0,
    "proceed_way":'',
    "is_progress":1
  })

  const [title, setTitle] = useState("");
  const [content ,setContent] = useState("");
  const [sub, setSub] = useState("");
  const [div, setDiv] = useState("");
  const [peopleNum, setPeopleNum] = useState(0);
  const [proceedWay, setProceedWay] = useState("");
  const [isProgress, setIsProgress] = useState(1);

  const {id} = useParams();
  const auth = localStorage.getItem("token");

  const goToPost = useNavigate();

  var getConfig = {
    method: 'get',
    url: `/post/${id}`,
    headers: { 
      'Authorization': `Bearer ${auth}`
    }
  };

  useEffect(() => {
      const getInfo = async () => {
        console.log(id)
        const {data} = await axios(getConfig);
        return data;
      }
      
      getInfo().then((response) => {
          setPost(response);
          setTitle(response.title);
          setContent(response.content);
          setSub(response.subject);
          setDiv(response.division);
          setPeopleNum(response.people_num);
          setProceedWay(response.proceed_way);
          setIsProgress(response.is_progress);
      });
  }, [])

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
      console.log(JSON.stringify(response.data));
      goToPost(`/post/${id}`)
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
    setTitle(value);
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
    setSub(value)
  };

  const divisionChange = (value) => {
    setDivision(value);
    setPost({
      ...post,
      ["division"]: value
    })
    setDiv(value); 
  };
  
  return (
    <div className="posting">
      <Title level={2}>프로젝트 기본정보를 입력해주세요</Title>
        <Title level={5}>과목명</Title>
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
        <Title level={5}>분반</Title>
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
        <Title level={5}>모집인원</Title>
        <Select
          size='large'
          value={peopleNum}
          style={{
            width: 350,
          }}
          onChange={(value) => {
            setPost({
              ...post,
             ["people_num"]: value
            })
            setPeopleNum(value);
          }}
          options={peopleNumData}
        />
        <Title level={5}>진행방식</Title>
        <Select
          size='large'
          value={proceedWay}
          style={{
            width: 350,
          }}
          onChange={(value) => {setPost({
            ...post,
            ["proceed_way"]: value
          })
          setProceedWay(value)
        }
        }
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
        <Title level={5}>모집여부</Title>
        <Select
          size='large'
          value={isProgress}
          style={{
            width: 350,
          }}
          onChange={(value) => {setPost({
            ...post,
            ["is_progress"]: value
          })
          setIsProgress(value)
        }
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
      <Title level={2}>프로젝트를 소개해주세요</Title>
      <Title level={5}>제목</Title>
      <Input size="large" name="title" value={title} onChange={getValue}/> 
      <br/>
      <br/>
      <CKEditor
          editor={ ClassicEditor }
          data={content}
          onReady={ editor => {
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
      <Button onClick={submit}>수정하기</Button>
      <br/>
      <br/>
      <br/>
    </div>
  );
}

export default App;