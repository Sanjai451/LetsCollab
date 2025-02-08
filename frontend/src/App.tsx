import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CodeEditorPage from './pages/CodeEditorPage';
import DrawingPage from './pages/DrawingPage';
import TypingPage from './pages/TypingPage'
import './App.css'
import HomePage from './pages/HomePage';
import SideBar from './Component/SideBar';
import { useState } from 'react';
import Helper from './Component/Helper';

function App() {

  const [helper, setHelper] = useState(false)
  
  return (
    <>
      <Router>
          <main>
            <SideBar setHelper={setHelper}/>
            <div className={`main_content`}>
              <Routes>
                <Route path="/" element={<><HomePage/></>} />
                <Route path="/code" element={<CodeEditorPage />} />
                <Route path="/draw" element={<DrawingPage />} />
                <Route path="/type" element={<TypingPage />} />
              </Routes>
              { helper && <Helper setHelper={setHelper}/> }
            </div>
          </main>
      </Router>
    </>
    
  );
}
export default App