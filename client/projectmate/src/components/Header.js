import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import '../style.css';
import { Modal, Button } from 'antd';
import { HomeOutlined } from "@ant-design/icons"
import { AiFillLock } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import WarnModal from './WarnModal';
import axios from 'axios';
import "./css/Home.css"

const Header=(props)=>{
    const [modalOpen, setModalOpen] = useState(false);
    const [failModal, setFailModal]= useState(false);
    const [id, setId]= useState('');
    const [pw, setPw]= useState('');

    const idHandler = e =>{
        setId(e.target.value);
        console.log("id" + id);
    }

    const pwHandler = e =>{
        setPw(e.target.value);
        console.log("pw" + pw);
    }

    const submit = async() =>{
        console.log("id : "+id + "pw : "+pw);
        var url = `http://localhost:8080/member/sign-in?id=${id}&password=${pw}`
        await axios.post(url).then(
            (response)=>{
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('nickname',response.data.nickname)
                localStorage.setItem('id', id)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('login-time', Date.now());
                window.location.reload();
            }
        ).catch(response => {
            setFailModal(true);
        })
    }

    const showModal = () =>{
        setModalOpen(true);
    };

    const handleCancel=()=>{
        setModalOpen(false);
    }

    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/')
    }

    useEffect(()=>{
        setId('');
        setPw('');
    },[modalOpen,setModalOpen])

    return(
        <>
            <img src='/projectmateLogo.png' onClick={goToHome} width={210} height={60} className='homeBtn'/>
            <div><button className='login-btn' onClick={showModal}><span className="btn-text">로그인</span></button></div>
                <Modal className='login-modal' open={modalOpen} onCancel={handleCancel} footer={null} width={450}>
                    <div className='login-form'>
                        <p className='login-title'>로그인</p>
                        <hr className='login-line'/>
                        <div className='login-input-form'>
                            <p className='login-input-components'><span className='login-input-text'><BsPersonCircle className='login-icons' size="20"/></span><input type='text' className='login-input' onChange={idHandler} placeholder="UserName" value={id}/></p>
                            <p className='login-input-components'><span className='login-input-text'><AiFillLock className='login-icons' size="20"/></span><input type='password' className='login-input' onChange={pwHandler} placeholder="Password" value={pw}/></p>
                        </div>
                        <p><button className='login-modal-btn' onClick={submit}>로그인</button></p>
                        <p className='register'>아이디가 없으신가요? <Link to="/register">회원가입</Link></p>
                        <p><button className='login-etc-btn'>ID 찾기</button><a className='etc-outline'/><button className='login-etc-btn'>비밀번호 찾기</button></p>
                    </div>
                </Modal>
                <WarnModal isModalOpen={failModal} setFailModal={setFailModal}/>
            </>
    );
}

export default Header;