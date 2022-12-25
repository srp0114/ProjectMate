import './App.css';
import './style.css'
import Header from './components/Header'
import Home from './components/Home'
import Banner from './components/Banner'
import LoginHeader from './components/LoginHeader'
function App() {
  return (
   <>
    <div className='header'>
      <LoginHeader/>
    </div>
      <Banner/>
    <div className='home'>
      <Home/>
    </div>
   </>
  );
}

export default App;