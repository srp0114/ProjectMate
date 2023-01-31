import React, {useCallback, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoPerson}  from 'react-icons/io5'
import '../style.css';

const LoginHeader=(props)=>{
    const [isExpire, setExpire] = useState(false)
    
    const EXPIRY_TIME = 1 * 3600 * 1000;                //로그인 세션 유지 시간.
    let loginTime = localStorage.getItem('login-time'); 
    let nowTime = Date.now();
    
    const [isOpen, setIsOpen]=useState(false);

    const goToMyPage = useNavigate();

    const goMyPage = e =>{
        goToMyPage('/mypage')
    }

    const openMyPage=()=>{
        const open = isOpen
        setIsOpen(!open)
       // console.log(nowTime);
    }

    const expiryLogin = useCallback(() =>{
        if(nowTime-loginTime > EXPIRY_TIME)         //1시간이 지나면 클리어
        {
            props.logOut();
        }
    });

    useEffect(()=>{
        expiryLogin()
    },[expiryLogin])

    return(
        <>
            <div>
                로고
            </div>
            <div className='menu'>
                <button onClick={openMyPage} className='profile-btn'><IoPerson size='30'/><span className='profile-nickname'>{props.nickname}</span></button>
                {isOpen &&<div className='sidebar'><ul>
                    <Link to={{
                        pathname : `/mypage`,
                        state:{
                            islogin :true,
                        }
                    }}
                        style={{ textDecoration: "none" }}>
                        <li className='list-component'>내정보</li>
                    </Link>
                    <li className='list-component'>작성한 글</li>
                    <li className='list-component'>북마크한 글</li>
                    <li className='list-component' onClick={props.logOut}>로그아웃</li>
                </ul></div>}
            </div>
            </>
    );
}

export default LoginHeader;