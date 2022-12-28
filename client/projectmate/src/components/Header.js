import React, { useState } from 'react';
import '../style.css';
import Modal from 'react-modal'
import LoginModal from './LoginModal'

const Header=()=>{

    const [modalOpen, setModalOpen] = useState(false);

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
             style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    height:'70%',
                    width : '30%',
                    margin:'0%'
                  },
            }}
            isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
                <LoginModal/>
            </Modal>
            </>
    );
}

export default Header;