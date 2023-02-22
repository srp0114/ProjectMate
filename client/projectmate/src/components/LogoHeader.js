import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../style.css';
import { Modal, Button } from 'antd';
import { AiFillLock } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import WarnModal from './WarnModal';
import { HomeOutlined } from '@ant-design/icons';
import axios from 'axios';
import "./css/Home.css"

const LogoHeader=(props)=>{

    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/')
    }

    return(
        <>
            <div className="homeBtn">
                <img src='/projectmateLogo.png' onClick={goToHome} width={210} height={60} className='homeBtn'/>
            </div>
            </>
    );
}

export default LogoHeader;