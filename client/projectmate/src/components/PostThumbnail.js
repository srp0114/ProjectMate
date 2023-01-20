import { React, useState } from 'react';
import { Link } from 'react-router-dom'
import { AiOutlineEye } from 'react-icons/ai';
import { BsBookmarkStar, BsFillBookmarkStarFill } from 'react-icons/bs'
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import {IoPerson} from 'react-icons/io5'

const PostThumbnail = (props) =>{
    const [BookMarkState, setBookMarkState]= useState(false);

    const bookMarkHandler = e =>{
        setBookMarkState(!BookMarkState);
    }

    const Tag = () =>{
        return(
            <>
            <span className='tag'># {props.subject}</span>
            <span className='tag'># {props.division}</span>
            </>
        )
    }

    return(
        <>
        <div className='post'>
            <div className='bookmarker'>{BookMarkState || props.isBookmarked ? <BsFillBookmarkStarFill size='50' onClick={bookMarkHandler}/>: <BsBookmarkStar size='50' onClick={bookMarkHandler}/>}</div>
            <Link to={`/post/${props.id}`} style={{ textDecoration: "none" }}>
            <h1 className='post-date'><span>{props.createdDate}</span></h1>
            <p className='post-title'>{props.title}</p>
            <p className='post-content' dangerouslySetInnerHTML = { {  __html : props.content } }></p>
            <div className='tag-container'>
                <Tag/>
            </div>
            <div className='post-footer'>
                <div className='owner'>
                    <IoPerson size="30"/><span className='owner-name'>{props.writer_nickname}</span>
                </div>
                <div className='icons'>
                    <AiOutlineEye size="30"/><span className='etc-num'>{props.view_count}</span>
                    <HiOutlineChatBubbleLeftRight size="30" className=''/><span className='etc-num'>{props.comment_count}</span>
                </div>
            </div>
            </Link>
        </div>
        </>
    );
}

export default PostThumbnail;