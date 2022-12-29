import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Divider, Typography } from 'antd';
import "./components/css/Details.css"

const { Title } = Typography;

function App() {
  return (
    <div className="posting">
      <Title level={2}>프로젝트 기본정보를 입력해주세요</Title>

      <Divider/>
      <Title level={2}>프로젝트를 소개해주세요</Title>
      <Editor
      initialValue="hello react editor world!"
      previewStyle="vertical"
      height="600px"
      initialEditType="wysiwyg"
      useCommandShortcut={false}
      toolbarItems={[
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['code', 'codeblock']
      ]}
      />
    </div>
  );
}

export default App;