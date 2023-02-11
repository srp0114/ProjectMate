import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Space, Typography, Divider, Avatar, Modal, Button, Input, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import "../css/MyPage.css";

const { Title, Text } = Typography;

const MyInfo = () => {
    const auth = localStorage.getItem('token')
    const nickname = localStorage.getItem('nickname')
    const id = localStorage.getItem('id')
    const email = localStorage.getItem('email')
    
    const [ChangePassword, setChangePassword] = useState("");
    const [ChangeCheckedPassword, setChangeCheckedPassword] = useState("");
    const [ChangeNickname, setChangeNickname] = useState("");

    const [passwordOpen, setPasswordOpen] = useState(false);
    const [nicknameOpen, setNicknameOpen] = useState(false);

    const [confirmLoading, setConfirmLoading] = useState(false);

    const [nicknameText, setNicknameText] = useState('변경할 닉네임을 입력하세요.');
    const [passwordText, setPasswordText] = useState('변경할 비밀번호를 입력하세요.');
    const [checkedPasswordText, setCheckedPasswordText] = useState('변경할 비밀번호를 다시 입력하세요.');

    const ChangedNickname = {
        "nickname" : ChangeNickname
    }

    const ChangedPassword = {
        "password" : ChangePassword,
        "checkedPassword" :  ChangeCheckedPassword
    }

    var nicknameConfig = {
        method: 'put',
        url: '/member/nickname',
        headers: { 
            'Authorization': `Bearer ${auth}`,
            'Content-Type': 'application/json'
        },
        data : ChangedNickname
    };

    const submitChangeNickname = () => {
        axios(nicknameConfig)
        .then(function (response) {
            console.log(nickname);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    var passwordConfig = {
        method: 'put',
        url: '/member/password',
        headers: { 
            'Authorization': `Bearer ${auth}`,
            'Content-Type': 'application/json'
        },
        data : ChangedPassword
    };

    const submitChangePassword = () => {
        axios(passwordConfig)
        .then(function (response) {
            console.log(ChangeCheckedPassword);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    const showNicknameModal = () => {
        setNicknameOpen(true);
    };

    const showPasswordModal = () => {
        setPasswordOpen(true);
    };
   
    
    const handleNicknameOk = () => {
        if(nickname === ChangeNickname) {
            setNicknameText('기존의 닉네임과 동일한 닉네임입니다.');
        } else {
            submitChangeNickname();
            setNicknameText('닉네임 변경이 완료되었습니다.')
            setConfirmLoading(true);
            setTimeout(() => {
            setNicknameOpen(false);
            setConfirmLoading(false);
            setNicknameText('변경할 닉네임을 입력하세요.');
            }, 2000);
        }
    };

    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/')
    }

    const LogOut = () =>{
        localStorage.clear();
        goToHome('/');
    }

    const handlePasswordOk = () => {
        if(ChangeCheckedPassword === ChangePassword) {
            setPasswordText('비밀번호 변경이 완료되었습니다.')
            setCheckedPasswordText('');
            submitChangePassword();
            setConfirmLoading(true)
            setTimeout(() => {
                setPasswordOpen(false);
                setConfirmLoading(false);
                setPasswordText('변경할 비밀번호를 입력하세요.')
                setCheckedPasswordText('변경할 비밀번호를 다시 입력하세요.');
                LogOut();
            }, 2000);
        } else {
            setPasswordText('변경할 비밀버호를 다시 확인해주세요.')
        }
    
    }
    
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setNicknameOpen(false);
        setPasswordOpen(false);
    };

    const onChangePassword = (event) => {
        setChangePassword(event.target.value);
    }

    const onChangeCheckedPassword = (event) => {
        if(ChangePassword === event.target.value) {
            setCheckedPasswordText('');
            setChangeCheckedPassword(event.target.value);
        }
        else {
            setCheckedPasswordText('입력한 비밀번호가 일치하지 않습니다.');
        }
    }


    const onChangeNickname = (event) => {
        setChangeNickname(event.target.value);
        console.log(event.target.value)
    }


    return (
        <>      
            <Space direction='vertical' className="myInfoTab">
                <Title level={4} className="color">내 정보</Title>
                    <Row>
                    <Col span={6}> <Title level={5}>닉네임</Title></Col>
                    <Col span={6}> <Title level={5}>{nickname}</Title></Col>
                    <Col span={6}>  
                        <Button type="primary"  onClick={showNicknameModal} className="button">변경하기</Button>
                        <Modal
                        title="닉네임 변경하기"
                        open={nicknameOpen}
                        onOk={handleNicknameOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}                       
                        >
                        <Text>{nicknameText}</Text>
                        <Input className="input" onChange={onChangeNickname}/>
                    </Modal>
                    </Col>
                    </Row>

                    <Row>
                    <Col span={6}><Title level={5}>학번</Title></Col>
                    <Col span={6}><Title level={5}>{id}</Title></Col>
                    </Row>
                    
                    <Row>
                    <Col span={6}><Title level={5}>이메일</Title></Col>
                    <Col span={18}><Title level={5}>{email}</Title></Col>
                    </Row>

                    <Row>
                    <Col span={6}><Title level={5}>비밀번호</Title></Col>
                    <Col span={6}>
                        <Button type="primary" onClick={showPasswordModal} className="button">변경하기</Button>
                        <Modal
                            title="비밀번호 변경하기"
                            open={passwordOpen}
                            onOk={handlePasswordOk}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancel}                       
                        >
                            <Text>{passwordText}</Text>
                            <Input className="input" onChange={onChangePassword}/>
                            <Text>{checkedPasswordText}</Text>
                            <Input className="input" onChange={onChangeCheckedPassword}/>
                        </Modal>
                    </Col>
                    </Row>
            </Space>
        </>
    )
}
export default MyInfo