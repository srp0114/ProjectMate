import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { AiOutlineEye } from 'react-icons/ai';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import {IoPerson} from 'react-icons/io5'
import axios from 'axios'

const PostThumbnail = (props) =>{
    return(
        <>
        <Link to={`/post/${props.id}`} style={{ textDecoration: "none" }}>
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
        </Link>
        </>
    );
}

export default PostThumbnail;