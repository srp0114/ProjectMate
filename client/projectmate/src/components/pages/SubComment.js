import axios from 'axios';
import React, {useEffect, useState} from 'react'

const SubComment =(props) =>{
    const [isHover, setIsHover] = useState(false);
    const [input, setInput] = useState(false);

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
                <p className='writer-content'><span className='writer'>{props.writer_nickname}</span>
                {isHover && <div className='comment-sub-btn-container'>
                    {props.isWriter && <>
                        <button className='comment-btns'>수정</button>
                        <button className='comment-btns' onClick={DeleteComment} >삭제</button>
                    </>
                    }
                    </div>}</p>
                <p className='comment-content'><span>{props.comment}</span></p>
            </div>
        </>
    )
}

export default SubComment;