import React from 'react'
import "./css/Home.css"

const LoginModal = () =>{
    return(
        <>
            <div className='login-form'>
                <p className='login-title'>로그인</p>
                <hr/>
                <p><span className='login-input-text'>아이디</span><input type='text' className='login-input'/></p>
                <p><span className='login-input-text'>비밀번호</span><input type='password' className='login-input'/></p>
                <p><button className='login-modal-btn'><span className='login-btn-text'>로그인</span></button></p>
                <p><a href='../components/'>회원가입</a></p>
            </div>
        </>
    )
}

export default LoginModal;