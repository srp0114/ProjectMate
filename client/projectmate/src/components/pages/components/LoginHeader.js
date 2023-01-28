import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoPerson}  from 'react-icons/io5'
import '../style.css';

const LoginHeader=(props)=>{
    const EXPIRY_TIME = 3 * 3600 * 1000;        //로그인 세션 만료 시간.
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

    const expiryLogin = () =>{
        //if(loginTime)
    }

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