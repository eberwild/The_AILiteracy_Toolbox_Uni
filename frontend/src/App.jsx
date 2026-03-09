import { Route , Routes } from 'react-router-dom';
// components
import ScrollToTop from './components/ScrollToTop';
// main pages
import HomePage from './pages/main-pages/HomePage';
import PillarPage from './pages/main-pages/PillarPage';
import ToolsPage from './pages/main-pages/ToolsPage';
import ContactPage from './pages/main-pages/ContactPage';
// side pages
import AddToolPage from './pages/side-pages/AddToolPage';
// pillar pages
import UnderstandingAI from './components/pillar-components/UnderstandingAI';
import CriticalThinking from './components/pillar-components/CriticakThinking';
import PracticalSkills from './components/pillar-components/PracticalSkills';
import Ethics from './components/pillar-components/Ethics';
// style
import './styles/App.css';


function App() {

  return (
    <>
    <ScrollToTop/>
      <Routes>
            <Route path='/'
                      element={<HomePage/>} />
            <Route path='/pillars'
                      element={<PillarPage/>} />
            <Route path='/understandingAI'
                      element={<UnderstandingAI/>} />
            <Route path='/criticalThinking'
                      element={<CriticalThinking/>} />
            <Route path='/practicalSkills'
                      element={<PracticalSkills/>} />
            <Route path='/ethics'
                      element={<Ethics/>} />
            <Route  path='/tools'
                      element={<ToolsPage/>} />
            <Route path='/add-tool'
                      element={<AddToolPage/>} />
            <Route path='/contact'
                      element={<ContactPage/>} />
        </Routes> 
    </>
  )
}

export default App;
