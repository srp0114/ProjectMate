import axios from 'axios';
import React, {useEffect, useState} from 'react'
import SubComment from './SubComment';
import {AiFillLock} from 'react-icons/ai'
import { Avatar, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../css/Details.css';

const Comment =(props) =>{
    const [isHover, setIsHover] = useState(false);
    const [input, setInput] = useState(false);
    const [subComment, setSubComment] = useState('');
    const [comment, setComment] = useState('');
    const [modComment, setModComment]= useState([props.content]);

    const [modSecret, setModSecret] = useState(0);
    const [subSecret, setSubSecret] = useState(0);
    const [modState, setModState] = useState(false);

    const auth = props.auth;

    //수정 비밀용
    const modSecretHandler = e =>{
        if(e.target.checked){
            setModSecret(1);
        }
        else{
            setModSecret(0);
        }
    }

    //답글 비밀용
    const subSecretHandler = e =>{
        if(e.target.checked){
            setSubSecret(1);
        }
        else{
            setSubSecret(0);
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
            "secret" : `${subSecret}`
            }
          };

        await axios(config).then((response)=>console.log(response.data)).catch((e) => console.log('something went wrong :(', e));
        setComment('');
        setInput(false);
        props.getComments();
        setSubSecret(0);
    }

    //수정하기
    const ModifyComment = (e) => {
          setModState(true);
    }

    const ModCommentText = e =>{
        setModComment(e.target.value)
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
            "secret" : `${modSecret}`
            }
          };
          axios(config)
          .then(response => console.log('댓글수정 완료!'))
          .catch(error => {
              console.error(error);
          });
          setModState(false);
          props.getComments();
          setModSecret(0);
    }

    //삭제하기
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
                <div className='mod-state'>
                    <div>
                        <textarea className='comment-mod-input' onChange={ModCommentText} value={modComment}/>
                    </div>
                    <div className='mod-input-footer'>
                        <div>
                            <label for='secret-mod-comment'>비밀글</label>
                            <input type='checkbox' className='secret-comment' id='secret-mod-comment' onClick={modSecretHandler} checked={modSecret}/>
                        </div> 
                        <Button onClick={sendModComment} className='comment-btn'>수정하기</Button>
                    </div>
                </div>
            </> 
            :
            <div className='comment'>
                <div className='comment-hover' onMouseOver={()=>setIsHover(true)} onMouseOut={()=>setIsHover(false)}>
                <Avatar size={60} icon={<UserOutlined/>}/>
                    <div style={{width:'100%'}}>
                        <div className='writer-content'><div className="writer">{props.writer_nickname}
                        </div>
                        {isHover && <div className='comment-sub-btn-container'>
                            <button onClick={clickHandler} className='comment-btns'>답글</button>   
                            {props.isWriter && <>
                                <button className='comment-btns' onClick={ModifyComment}>수정</button>
                                <button className='comment-btns' onClick={DeleteComment} >삭제</button>
                            </>
                            }
                        </div>}
                        </div>
                        <p className='comment-content'>{props.secret ? <AiFillLock size="14"/> : <></>}{props.content}</p>
                    </div>
                </div>
                {input && <div className='sub-comment-input-container'>
                    <input className='sub-comment-input' type="text" placeholder='답글을 쓰세요...' value={subComment} onChange={(e)=>setSubComment(e.target.value)}/>
                    <div className='sub-input-btn-container'>
                    <div>
                        <label for='secret-sub-comment'>비밀글</label>
                        <input type='checkbox' className='secret-comment' id='secret-sub-comment' onClick={subSecretHandler} checked={subSecret}/>
                    </div> 
                    <Button onClick={postSubComment}>답글달기</Button>
                    </div>
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