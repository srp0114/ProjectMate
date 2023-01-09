import axios from 'axios';
import React, {useEffect, useState} from 'react'

const Comment =(props) =>{
    const [isHover, setIsHover] = useState(false);
    const [input, setInput] = useState(false);
    const [subComment, setSubComment] = useState('');
    const [subComments, setSubComments] = useState(props.subComments);

    const clickHandler = (e) =>{
        setInput(!input);
        setSubComment('');
    }

    const postSubComment = () =>{
        setSubComment('');
        setInput(false);
    }

    const DeleteComment = e =>{
        axios.delete(`http://localhost:8080/post/${e.target.key}`)
        .then(response => console.log('게시글 삭제 성공'))
        .catch(error => {
            console.error(error);
    });
    }

    return(
        <>
            <div className='comment' onMouseOver={()=>setIsHover(true)} onMouseOut={()=>setIsHover(false)}>
                <p className='writer-content'><span className='writer'>{props.name}</span>
                {isHover && <div className='comment-sub-btn-container'>
                    <button onClick={clickHandler} className='comment-btns'>답글</button>
                    <button className='comment-btns'>수정</button>
                    <button className='comment-btns' key={props.key} onClick={DeleteComment} >삭제</button>
                    </div>}</p>
                <p className='comment-content'><span>{props.comment}</span></p>
                {input && <div className='sub-comment-input-container'>
                    <input className='sub-comment-input' type="text" placeholder='답글을 쓰세요~' value={subComment} onChange={(e)=>setSubComment(e.target.value)}/><button className='sub-comment-btn' onClick={postSubComment}>답글달기</button>
                    </div>}
                <div>
                    {subComments.length > 0 && subComments.map((comment, key)=>{        //자식댓글수가 0개 이상일경우만 생성.
                        <Comment content={comment} key={key}/>
                    })}
                </div>
            </div>
        </>
    )
}

export default Comment;