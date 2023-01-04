import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import {IoPerson} from 'react-icons/io5'

const TestPost = (props) =>{
    return(
    <>
    <div className='post'>
        <p className='post-title'>게시글</p>
        <p className='post-content'>테스트!!</p>
        <div className='post-footer'>
            <div className='owner'>
                <IoPerson size="30"/><span className='owner-name'>박완호</span>
            </div>
            <div className='icons'>
                <AiOutlineEye size="30"/><span className='etc-num'>11</span>
                <HiOutlineChatBubbleLeftRight size="30" className=''/><span className='etc-num'>10</span>
            </div>
        </div>
    </div>
    </>
    );
}

export default TestPost;