import React, {useEffect, useState} from 'react';
import { Typography, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';
import Header from '../Headers/Header';
import "../css/Details.css"

const { Title, Text } = Typography;

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
      setNameMessage('2??? ?????? ???????????????.')
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
      setPasswordMessage('?????????, ??????, ???????????? ?????? 8??? ?????? ???????????????.')
      setPasswordValid(false)
    }
  }

  const onCheckedPasswordHandler = (event) => {
    setCheckedPassword(event.currentTarget.value);
    if (event.target.value === Password) {
      setCheckedPasswordMessage('')
      setCheckedPasswordValid(true)
    } else {
      setCheckedPasswordMessage('??????????????? ???????????? ????????????.')
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
      setEmailMessage('????????? ????????? ???????????????.');
      setEmailValid(false);
    }
  }

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
    if (event.target.value.length < 2) {
      setNicknameMessage('2??? ?????? ???????????????.')
      setNicknameValid(false)
    } else {
      setNicknameMessage('')
      setNicknameValid(true)
    } 
  }

  return (
    <>   
    <div className='header'>
      <Header/>
    </div>

    <div className="posting">
    <Title level={2} className="register">????????????</Title>
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
        label="??????"
        name="StudentID"
      >
        <Input onChange={onStudentIDHandler}/>
        <Text type="danger">{StudentIdMessage}</Text>
      </Form.Item>

      <Form.Item className="form"
        label="????????????"
        name="Password"
      >
        <Input onChange={onPasswordHandler}/>
        <Text type="danger">{PasswordMessage}</Text>
      </Form.Item>

      <Form.Item className="form"
        label="???????????? ??????"
        name="CheckedPassword"
      >
        <Input onChange={onCheckedPasswordHandler}/>
        <Text type="danger">{CheckedPasswordMessage}</Text>
      </Form.Item>

      <Form.Item className="form"
        label="??????????????? ?????????"
        name="Email"
      >
        <Input onChange={onEmailHandler}/>
        <Text type="danger">{EmailMessage}</Text>
      </Form.Item>

      <Form.Item className="form"rff
        label="?????????"
        name="Nickname"
      >
        <Input onChange={onNicknameHandler}/>
        <Text type="danger">{NicknameMessage}</Text>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 8,
        }} className="submitBtn"
      >
      <Button type="primary" htmlType="submit" onClick={submit} disabled={NotAllow}>
        ????????????
      </Button>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='changeTitle'>
        <p>????????? ?????????????????????.</p>
        <p>{Nickname}??? ???????????????!</p>
      </Modal>
      </Form.Item>
    </Form>
    </div>
    </>
  );
}

export default Register;