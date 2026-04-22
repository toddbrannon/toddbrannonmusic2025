import { Routes, Route } from 'react-router-dom';
import LeadMagnetPage from './pages/LeadMagnetPage';
import Summer2026 from './pages/Summer2026';
import CMIndex from './pages/confidentmusician/Index';
import CMLessons from './pages/confidentmusician/Lessons';
import CMPDFs from './pages/confidentmusician/PDFs';
import CMVideos from './pages/confidentmusician/Videos';
import CMAudio from './pages/confidentmusician/Audio';
import HomePage from './HomePage';

function App() {
  return (
    <Routes>
      <Route path="/summer-2026" element={<Summer2026 />} />
      <Route path="/confidentmusician" element={<CMIndex />} />
      <Route path="/confidentmusician/lessons" element={<CMLessons />} />
      <Route path="/confidentmusician/pdfs" element={<CMPDFs />} />
      <Route path="/confidentmusician/videos" element={<CMVideos />} />
      <Route path="/confidentmusician/audio" element={<CMAudio />} />
      <Route path="/free/:slug" element={<LeadMagnetPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;