import React, {useState} from 'react';
import { IoPerson}  from 'react-icons/io5'
import '../style.css';

const LoginHeader=(props)=>{
    const [isOpen, setIsOpen]=useState(false);

    const openMyPage=()=>{
        const open = isOpen
        setIsOpen(!open)
    }

    return(
        <>
            <div>
                로고
            </div>
            <div className='menu'>
                <button onClick={openMyPage} className='profile-btn'><IoPerson size='30'/><span className='profile-nickname'>{props.nickname}</span></button>
                {isOpen &&<div className='sidebar'><ul>
                    <li className='list-component'>내정보</li>
                    <li className='list-component'>작성한 글</li>
                    <li className='list-component'>북마크한 글</li>
                    <li className='list-component'>로그아웃</li>
                </ul></div>}
            </div>
            </>
    );
}

export default LoginHeader;