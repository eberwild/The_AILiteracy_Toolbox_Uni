import { Route , Routes } from 'react-router-dom';
// components
import ScrollToTop from './components/ScrollToTop';
// main pages
import HomePage from './pages/main-pages/HomePage';
import BlackboardPage from './pages/main-pages/BlackboardPage';
import ToolsPage from './pages/main-pages/ToolsPage';
import ContactPage from './pages/main-pages/ContactPage';
// side pages
import RegisterPage from './pages/side-pages/RegisterPage';
import LoginPage from './pages/side-pages/LoginPage';
import AddToolPage from './pages/side-pages/AddToolPage';
import RequestReset from './pages/side-pages/RequestReset';
import ResetPage from './pages/side-pages/ResetPage';
import Requirements from './pages/side-pages/Requirements';
// pillar pages
import PillarPage from './pages/main-pages/PillarPage';
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
            <Route path='/register'
                       element={<RegisterPage/>} />
            <Route path='/login'
                      element={<LoginPage/>} />
            <Route path='/reset-request'
                      element={<RequestReset/>} />
            <Route path='/reset'
                      element={<ResetPage/>} />
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
            <Route path='/blackboard'
                   element={<BlackboardPage/>} />
            <Route  path='/tools'
                      element={<ToolsPage/>} />
            <Route path='/add-tool'
                      element={<AddToolPage/>} />
            <Route path='/requirements'
                      element={<Requirements/>} />
            <Route path='/contact'
                      element={<ContactPage/>} />
        </Routes> 
    </>
  )
}

export default App;
