import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../style.css';
import Modal from 'react-modal'
import axios from 'axios';

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

    return(
        <>
            <div>
                로고
            </div>
            <div><button className='login-btn' onClick={showModal}><span className="btn-text">로그인</span></button></div>
                <Modal
                className='login-modal' isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
                    <div className='login-form'>
                        <p className='login-title'>로그인</p>
                        <hr className='login-line'/>
                        <div className='login-input-form'>
                            <p className='login-input-components'><span className='login-input-text'>아이디</span><input type='text' className='login-input' onChange={idHandler}/></p>
                            <p className='login-input-components'><span className='login-input-text'>비밀번호</span><input type='password' className='login-input' onChange={pwHandler}/></p>
                        </div>
                        <p><button className='login-modal-btn' onClick={submit}><span className='login-btn-text'>로그인</span></button></p>
                        <p>아이디가 없으신가요? <Link to="/register">회원가입</Link></p>
                        <p><button className='login-etc-btn'>ID 찾기</button><a className='etc-outline'/><button className='login-etc-btn'>비밀번호 찾기</button></p>
                    </div>
                </Modal>
                <Modal className='fail-modal' isOpen={failModal} onRequestClose={() => setFailModal(false)}>
                    <p className='fail-massage'>아이디 혹은 비밀번호가 올바르지 않습니다</p>
                    <button className='ok-btn' onClick={()=>setFailModal(false)}>OK</button>
                </Modal>
            </>
    );
}

export default Header;