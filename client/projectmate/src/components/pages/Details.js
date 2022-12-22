import '../App.css';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Space, Typography, Input } from 'antd';

const { Title, Text } = Typography;
const { TextArea } = Input;

function App() {
  return (
    <div className="App">
      <p className="postingDay">2022.12.18 20:43</p>

      <Title level={1} className="postingTitle">팀원 구합니다!</Title>

      <br/>
      <Space align="center">
        <Avatar size={38} icon={<UserOutlined/>}/> 
        <Text fontSize={100}>종강원해 (20)</Text> 
      </Space>

      <Divider/>

      <div className="postingInfo">
      <Space align="center" size={235}>
        <Space align="center" size={100}> 
        <Title level={4}>과목명</Title>
        <Title level={4}>웹프레임워크1</Title>       
        </Space>
      
        <Space align="center" size={135}>
        <Title level={4}>분반</Title>
        <Title level={4}>B반</Title>
        </Space>
      </Space>

      <Space align="center" size={315}>
        <Space align="center" size={85}> 
        <Title level={4}>모집인원</Title>
        <Title level={4}>4명</Title>
        </Space>

        <Space align="center" size={100}>
        <Title level={4}>진행방식</Title>
        <Title level={4}>오프라인</Title>
        </Space>
      </Space>
      </div>
      <Divider style={{ borderWidth: 5, borderColor: 'grey' }}  />
      <br/>
      <br/>
      <TextArea readOnly={true} autoSize={{ minRows: 2, maxRows: 6 }} style={{resize: 'none', border:'none', fontSize:'18px'}}
      value="팀플 주제는 아직 미정이지만, 쇼핑몰 프로젝트로 진행해볼까합니다. 
      깃을 조금이라도 써보신 분이면 좋을 것 같고 연락 잘 되고, 열정적으로 참여하실 분 찾고 있습니다!"/>
    </div>
  );
}

export default App;
