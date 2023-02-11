import React from 'react';
import { Modal } from 'antd';

const WarnModal = ( props ) =>{
    const handleOk =()=>{
        props.setFailModal(false);
    }

    return(
        <>
            <Modal open={props.isModalOpen} onOk={handleOk}>
                    <p>존재하지 않는 아이디 입니다....</p>
            </Modal>
        </>
    )
}

export default WarnModal