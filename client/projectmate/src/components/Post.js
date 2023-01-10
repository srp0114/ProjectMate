import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import {IoPerson} from 'react-icons/io5'

const Post = (props) =>{
    return(
    <>
    <div className='post'>
        <p className='post-title'>{props.title}</p>
        <p className='post-content'>{props.content}</p>
        <div className='post-footer'>
            <div className='owner'>
                <IoPerson size="30"/><span className='owner-name'>{props.writer}</span>
            </div>
            <div className='icons'>
                <AiOutlineEye size="30"/><span className='etc-num'>{props.view_count}</span>
                <HiOutlineChatBubbleLeftRight size="30" className=''/><span className='etc-num'>{props.comment_count}</span>
            </div>
        </div>
    </div>
    </>
    );
}

export default Post;