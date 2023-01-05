import React from 'react';
import { Typography, Button, Checkbox, Form, Input } from 'antd';
import "./components/css/Details.css"

const { Title } = Typography;

function App() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
        name="ID"
        rules={[
          {
            required: true,
            message: '학번을 입력해주세요.',
          },
        ]}
      >
        <Input />
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
        <Input />
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
        <Input />
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
        <Input />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>로그인 상태 유지</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          가입하기
        </Button>
      </Form.Item>
    </Form>
    </div>
    </>
  );
};
export default App;