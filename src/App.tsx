import { Routes, Route, Navigate } from 'react-router-dom';
import LeadMagnetPage from './pages/LeadMagnetPage';
import FreeResources from './pages/FreeResources';
import CMIndex from './pages/confidentmusician/Index';
import CMLessons from './pages/confidentmusician/Lessons';
import CMPDFs from './pages/confidentmusician/PDFs';
import CMVideos from './pages/confidentmusician/Videos';
import CMAudio from './pages/confidentmusician/Audio';
import HomePage from './HomePage';
import PrivacyPolicy from './PrivacyPolicy';

function App() {
  return (
    <Routes>
      <Route path="/confidentmusician" element={<CMIndex />} />
      <Route path="/confidentmusician/lessons" element={<CMLessons />} />
      <Route path="/confidentmusician/pdfs" element={<CMPDFs />} />
      <Route path="/confidentmusician/videos" element={<CMVideos />} />
      <Route path="/confidentmusician/audio" element={<CMAudio />} />
      <Route path="/free/:slug" element={<LeadMagnetPage />} />
      <Route path="/free-resources" element={<FreeResources />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      {/* Retired: the Summer 2026 landing page. Redirect rather than render nothing. */}
      <Route path="/summer-2026" element={<Navigate to="/" replace />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;