import React, {useState, useEffect, useCallback} from 'react'
import Comment from './Comment'
import axios from 'axios';

const Comments =() =>{
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [isHover, setIsHover] = useState(false);
    const url = 'http://localhost:8080/coment/1';

    /*
    const postComment =()=>{
        const json ={name : 'writer', comment : `${comment}`}
        axios.post(url,json).then((response)=>console.log("댓글 전송 성공!!"))
        setComment('');
    }*/

    const postComment=()=>{
        const json ={name : 'writer', comment : `${comment}`};
        commentList.push(json);
        console.log(JSON.stringify(commentList));
        setComment('');
    }
    useEffect(()=>{
        axios.get(url).then((response)=>setCommentList([response.data]));
        console.log(isHover)
    },[])

    const commentHandler = (e) =>{
        setComment(e.target.value);
        console.log(e.target.value)
    }

    return(
        <>
            <div className='comment-input-container'>
                <input type='text' className='comment-input' placeholder='댓글을 입력하세요...' onChange={commentHandler} value={comment}></input>
                <button className='comment-btn' onClick={postComment}>댓글 등록</button>
            </div>
            <div className='comments-container'>
                {commentList.map((comment)=>(
                    <Comment name={comment.name} comment={comment.comment}/>
                ))}
            </div>
        </>
    )
}

export default Comments