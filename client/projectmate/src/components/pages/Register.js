import { Divider, Typography } from 'antd';
import "./components/css/Details.css"

const { Title } = Typography;

function App() {
  return (
    <div className="posting">
      <Title level={2}>프로젝트 기본정보를 입력해주세요</Title>

      <Divider/>
      <Title level={2}>프로젝트를 소개해주세요</Title>
      
    </div>
  );
}

export default App;