import {React, useState} from 'react';
import { Typography, Button, Modal, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import "../css/Details.css"

const { Title, Text } = Typography;

function App() {
  const [studentID, setStudentID] = useState("");
  const [Password, setPassword] = useState("");
  const [CheckedPassword, setCheckedPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Nickname, setNickname] = useState("");
    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    window.location.replace("/")
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  var data = JSON.stringify({
      studentId: studentID,
      email: Email, 
      nickname: Nickname,
      password: Password,
      checkedPassword : CheckedPassword,
      role: "user", 
    });

    var config = {
      method: 'post',
      url: 'http://localhost:8080/member/sign-up',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

  const submit = () => {
    axios(config)
    .then(function (response) {
      console.log(response.data)
      showModal()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const onFinish = (values) => {
    console.log('Success:', values); 
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onStudentIDHandler = (event) => {
    setStudentID(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onCheckedPasswordHandler = (event) => {
    setCheckedPassword(event.currentTarget.value);
  }  
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }
  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  }

  return (
    <>   
    <div className="posting">
    <Title level={2}>회원가입</Title>
    <Form
      name="large"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="학번"
        name="studentID"
        rules={[
          {
            required: true,
            message: '학번을 입력해주세요.',
          },
        ]}
      >
        <Input onChange={onStudentIDHandler}/>
      </Form.Item>

      <Form.Item
        label="비밀번호"
        name="Password"
        rules={[
          {
            required: true,
            message: '비밀번호를 입력해주세요.',
          },
        ]}
      >
        <Input onChange={onPasswordHandler}/>
      </Form.Item>

      <Form.Item
        label="비밀번호 확인"
        name="CheckedPassword"
        rules={[
          {
            required: true,
            message: '비밀번호를 다시 입력해주세요.',
          },
        ]}
      >
        <Input onChange={onCheckedPasswordHandler}/>
      </Form.Item>

      <Form.Item
        label="한성대학교 이메일"
        name="Email"
        rules={[
          {
            required: true,
            message: '한성대학교 이메일을 입력해주세요.',
          },
        ]}
      >
        <Input onChange={onEmailHandler}/>
      </Form.Item>

      <Form.Item
        label="닉네임"
        name="Nickname"
        rules={[
          {
            required: true,
            message: '닉네임을 입력해주세요.',
          },
        ]}
      >
        <Input onChange={onNicknameHandler}/>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={submit}>
          가입하기
        </Button>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>가입이 완료되었습니다.</p>
        <p>{Nickname}님 환영합니다!</p>
      </Modal>
      </Form.Item>
    </Form>
    </div>
    </>
  );
}

export default App;