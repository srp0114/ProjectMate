import React, {useState} from 'react'

const Comment =(props) =>{
    const [isHover, setIsHover] = useState(false);
    const [input, setInput] = useState(false);
    const [subComment, setSubComment] = useState('');

    const clickHandler = (e) =>{
        setInput(!input);
        setSubComment('');
    }

    const postSubComment = () =>{
        setSubComment('');
        setInput(false);
    }
    return(
        <>
            <div className='comment' onMouseOver={()=>setIsHover(true)} onMouseOut={()=>setIsHover(false)}>
                <p className='writer-content'><span className='writer'>{props.name}</span>
                {isHover && <div className='comment-sub-btn-container'>
                    <button onClick={clickHandler} className='comment-btns'>답글</button>
                    <button className='comment-btns'>수정</button>
                    <button className='comment-btns'>삭제</button>
                    </div>}</p>
                <p className='comment-content'><span>{props.comment}</span></p>
                {input && <div className='sub-comment-input-container'>
                    <input className='sub-comment-input' type="text" placeholder='답글을 다세요~' value={subComment} onChange={(e)=>setSubComment(e.target.value)}/><button className='sub-comment-btn' onClick={postSubComment}>답글달기</button>
                    </div>}
            </div>
        </>
    )
}

export default Comment;