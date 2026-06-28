import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProjetosHub from './pages/ProjetosHub';
import Jokenpo from './pages/mini-projetos/Jokenpo';
import UiPerfeita from './pages/mini-projetos/UiPerfeita';
import Calculadora from './pages/mini-projetos/Calculadora';
import Doom from './pages/mini-projetos/Doom';
import UiMain from './pages/mini-projetos/UiMain';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projetos" element={<ProjetosHub />} />
      <Route path="/projetos/jokenpo/*" element={<Jokenpo />} />
      <Route path="/projetos/uiperfeita/*" element={<UiPerfeita />} />
      <Route path="/projetos/calculadora" element={<Calculadora />} />
      <Route path="/projetos/doom" element={<Doom />} />
      <Route path="/projetos/uimain" element={<UiMain />} />
    </Routes>
  );
}

export default App;
