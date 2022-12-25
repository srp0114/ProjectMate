import React, { useState } from 'react';
import TotalButton from './pages/TotalButton';
import Grade1Button from './pages/Grade1Button';
import Grade2Button from './pages/Grade2Button';
import Grade3Button from './pages/Grade3Button';
import Grade4Button from './pages/Grade4Button';

const Home=()=>{
    const [button, setButton] = useState('');

    const [activeButton, setActive] = useState(false);

    const handleClickButton = e => {
        const name = e.target.value;
        setButton(name);
    };

    const selectComponent = {               //배열에 버튼별 컴포넌트를 저장해둔다.
        'total' : <TotalButton/>,
        'grade1': <Grade1Button/>,
        'grade2': <Grade2Button/>,
        'grade3': <Grade3Button/>,
        'grade4': <Grade4Button/>
    };
    return(
        <>
            <div className='btn-container'>
                <button className='main-btn' onClick={handleClickButton} value={'total'}>전체</button>
                <button className='main-btn' onClick={handleClickButton} value={'grade1'}>1학년</button>
                <button className='main-btn' onClick={handleClickButton} value={'grade2'}>2학년</button>
                <button className='main-btn' onClick={handleClickButton} value={'grade3'}>3학년</button>
                <button className='main-btn' onClick={handleClickButton} value={'grade4'}>4학년</button>
            </div>
            <div className='toggle-btn'>
                <h3 className='toggle-btn-name'>모집중</h3>
                <input type="checkbox" id="toggle" hidden/> 
                <label for="toggle" class="toggleSwitch">
                <span class="toggleButton"></span>   
                </label>
            </div>
            {button &&<div className='sub-btn-container'>{selectComponent[button]}</div>}
        </>
    )
}

export default Home;