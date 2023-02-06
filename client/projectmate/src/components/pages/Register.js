import React, {useEffect, useState} from 'react';
import { Typography, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';
import "../css/Details.css"

const { Title } = Typography;

const Register = () => {
  const [StudentID, setStudentID] = useState("");
  const [Password, setPassword] = useState("");
  const [CheckedPassword, setCheckedPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Nickname, setNickname] = useState("");
    
  const [StudentIdValid, setStudentIdValid] = useState(false);
  const [PasswordValid, setPasswordValid] = useState(false);
  const [CheckedPasswordValid, setCheckedPasswordValid] = useState(false);
  const [EmailValid, setEmailValid] = useState(false);
  const [NicknameValid, setNicknameValid] = useState(false);

  const [StudentIdMessage, setNameMessage] = useState('')
  const [PasswordMessage, setPasswordMessage] = useState('')
  const [CheckedPasswordMessage, setCheckedPasswordMessage] = useState('')
  const [EmailMessage, setEmailMessage] = useState('')
  const [NicknameMessage, setNicknameMessage] = useState('')

  const [NotAllow, setNotAllow] = useState(true);

  useEffect(() => {
    if (StudentIdValid && PasswordValid && CheckedPasswordValid && EmailValid && NicknameValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [StudentIdValid, PasswordValid, CheckedPasswordValid, EmailValid, NicknameValid]);

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
      studentId: StudentID,
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
    if (event.target.value.length < 2) {
      setNameMessage('2자 이상 입력하세요.')
      setStudentIdValid(false)
    } else {
      setNameMessage('')
      setStudentIdValid(true)
    }
  }
  
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
    const regax = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    if (regax.test(event.target.value)) {
      setPasswordMessage('')
      setPasswordValid(true);
    } else {
      setPasswordMessage('영문자, 숫자, 특수문자 조합 8자 이상 입력하세요.')
      setPasswordValid(false)
    }
  }

  const onCheckedPasswordHandler = (event) => {
    setCheckedPassword(event.currentTarget.value);
    if (event.target.value === Password) {
      setCheckedPasswordMessage('')
      setCheckedPasswordValid(true)
    } else {
      setCheckedPasswordMessage('비밀번호를 다시 확인해주세요.')
      setCheckedPasswordValid(false)
    }
  }  

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
    const regex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    if (regex.test(event.target.value)) {
      setEmailMessage('');
      setEmailValid(true);
    } else {
      setEmailMessage('이메일 형식을 맞춰주세요.');
      setEmailValid(false);
    }
  }

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
    if (event.target.value.length < 2) {
      setNicknameMessage('2자 이상 입력하세요.')
      setNicknameValid(false)
    } else {
      setNicknameMessage('')
      setNicknameValid(true)
    } 
  }

  return (
    <>   
    <div className="posting">
    <Title level={2} className="register">회원가입</Title>
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
      autoComplete="on"
    >
      <Form.Item className="form"
        label="학번"
        name="StudentID"
      >
        <Input onChange={onStudentIDHandler}/>
        {StudentIdMessage}
      </Form.Item>

      <Form.Item className="form"
        label="비밀번호"
        name="Password"
      >
        <Input onChange={onPasswordHandler}/>
        {PasswordMessage}
      </Form.Item>

      <Form.Item className="form"
        label="비밀번호 확인"
        name="CheckedPassword"
      >
        <Input onChange={onCheckedPasswordHandler}/>
        {CheckedPasswordMessage}
      </Form.Item>

      <Form.Item className="form"
        label="한성대학교 이메일"
        name="Email"
      >
        <Input onChange={onEmailHandler}/>
        {EmailMessage}
      </Form.Item>

      <Form.Item className="form"rff
        label="닉네임"
        name="Nickname"
      >
        <Input onChange={onNicknameHandler}/>
        {NicknameMessage}
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 8,
        }} className="submitBtn"
      >
      <Button type="primary" htmlType="submit" onClick={submit} disabled={NotAllow}>
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

export default Register;