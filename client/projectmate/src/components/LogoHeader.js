import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../style.css';
import { Modal } from 'antd';
import { AiFillLock } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import WarnModal from './WarnModal';
import axios from 'axios';
import "./css/Home.css"

const LogoHeader=(props)=>{
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

    return(
        <>
            <div>
                로고
            </div>
            </>
    );
}

export default LogoHeader;