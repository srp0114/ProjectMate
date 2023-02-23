import React from 'react';
import { Modal } from 'antd';
import "../css/Home.css"

const WarnModal = ( props ) =>{
    const handleOk =()=>{
        props.setFailModal(false);
    }

    return(
        <>
            <Modal open={props.isModalOpen} onOk={handleOk} className="changeTitle">
                    <p>존재하지 않는 아이디입니다...</p>
            </Modal>
        </>
    )
}

export default WarnModal