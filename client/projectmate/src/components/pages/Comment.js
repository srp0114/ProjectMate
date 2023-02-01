import axios from 'axios';
import React, {useEffect, useState} from 'react'
import SubComment from './SubComment';
import {AiFillLock} from 'react-icons/ai'

const Comment =(props) =>{
    const [isHover, setIsHover] = useState(false);
    const [input, setInput] = useState(false);
    const [subComment, setSubComment] = useState('');
    const [comment, setComment] = useState('');
    const [modComment, setModComment]= useState(props.content);

    const [secret, setSecret] = useState(0);
    const [modState, setModState] = useState(false);

    const auth = props.auth;

    const secretHandler = e =>{
        if(e.target.checked){
            setSecret(1);
        }
        else{
            setSecret(0);
        }
    }

    const clickHandler = (e) =>{
        setInput(!input);
        setSubComment('');
    }

    //답글 보내기
    const postSubComment =async()=>{
        var config = {
            method: `post`,
            url: `/comment/${props.postId}`,
            headers: { 
              'Authorization': `${auth}`,
              'Content-Type': 'application/json'
            },
            data : {
            "content" : `${subComment}`,
            "parentId" : `${props.id}`,
            "secret" : `${secret}`
                    }
          };

        await axios(config).then((response)=>console.log(response.data)).catch((e) => console.log('something went wrong :(', e));
        setComment('');
        setInput(false);
        props.getComments();
    }

    //수정하기
    const ModifyComment = (e) => {
          setModState(true);
    }

    const ModCommentText = e =>{
        setModComment(e.target.value)
        console.log(modComment)
    }

    //수정 메시지 보내기
    const sendModComment=(e)=>{
        var config = {
            method: `put`,
            url: `/comment/${props.id}`,
            headers: { 
              'Authorization': `${auth}`,
              'Content-Type': 'application/json'
            },
            data : {
            "content" : `${modComment}`,
            "parentId" : null,
            "secret" : `${secret}`
            }
          };
          axios(config)
          .then(response => console.log('댓글수정 완료!'))
          .catch(error => {
              console.error(error);
          });
          setModState(false);
          props.getComments();
    }

    //삭제
    const DeleteComment = e =>{ 
        var config={
            method: `delete`,
            url: `/comment/${props.id}`,
            headers: { 
              'Authorization': `${auth}`,
              'Content-Type': 'application/json'
            },
        }
        axios(config)
        .then(response => console.log('댓글 삭제 성공'))
        .catch(error => {
            console.error(error);
        });
        props.getComments();
    }
    
    return(
        <>
            {modState ? 
            <>
                <div>
                    <textarea className='comment-input' onChange={ModCommentText} value={modComment} />
                    <button onClick={sendModComment} className='comment-mod-btn'>수정하기</button>
                </div>
            </> 
            :
            <div className='comment'>
                <div onMouseOver={()=>setIsHover(true)} onMouseOut={()=>setIsHover(false)}>
                    <p className='writer-content'><span className='writer'>{props.writer_nickname}</span>
                    {isHover && <div className='comment-sub-btn-container'>
                        <button onClick={clickHandler} className='comment-btns'>답글</button>
                        {props.isWriter && <>
                            <button className='comment-btns' onClick={ModifyComment}>수정</button>
                            <button className='comment-btns' onClick={DeleteComment} >삭제</button>
                        </>
                        }
                        </div>}</p>
                    <p className='comment-content'>{props.secret ? <AiFillLock size="14"/> : <></>}<span>{props.content}</span></p>
                </div>
                {input && <div className='sub-comment-input-container'>
                    <input className='sub-comment-input' type="text" placeholder='답글을 쓰세요...' value={subComment} onChange={(e)=>setSubComment(e.target.value)}/><button className='sub-comment-btn' onClick={postSubComment}>답글달기</button>
                    </div>}
                <div>
                    {props.commentList.map((subcomment)=>(
                        <SubComment {...subcomment} auth={props.auth} getComments={props.getComments} postId={props.postId} parentId={props.id}/>
                    ))}
                </div>
            </div>}
           
        </>
    )
}

export default Comment;