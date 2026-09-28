import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigationType } from 'react-router-dom';
import SiteNav from './components/SiteNav';
import LeadMagnetPage from './pages/LeadMagnetPage';
import FreeResources from './pages/FreeResources';
import CMIndex from './pages/confidentmusician/Index';
import CMLessons from './pages/confidentmusician/Lessons';
import CMPDFs from './pages/confidentmusician/PDFs';
import CMVideos from './pages/confidentmusician/Videos';
import CMAudio from './pages/confidentmusician/Audio';
import HomePage from './HomePage';
import PrivacyPolicy from './PrivacyPolicy';
import Licensing from './pages/Licensing';
import GuitarTogether from './pages/GuitarTogether';

// A client-side route change keeps the previous scroll offset, so following a
// link from halfway down a page drops you halfway down the next one. Anchors
// (/#about) are left to useScrollToHash, and back/forward keep their position.
function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (hash || navigationType === 'POP') return;
    window.scrollTo(0, 0);
  }, [pathname, hash, navigationType]);

  return null;
}

function App() {
  // The Confident Musician pages ship their own sticky header in CMLayout.
  const hideNav = useLocation().pathname.startsWith('/confidentmusician');

  return (
    <>
      <ScrollToTopOnNavigate />
      {!hideNav && <SiteNav />}
      <Routes>
      <Route path="/confidentmusician" element={<CMIndex />} />
      <Route path="/confidentmusician/lessons" element={<CMLessons />} />
      <Route path="/confidentmusician/pdfs" element={<CMPDFs />} />
      <Route path="/confidentmusician/videos" element={<CMVideos />} />
      <Route path="/confidentmusician/audio" element={<CMAudio />} />
      <Route path="/free/:slug" element={<LeadMagnetPage />} />
      <Route path="/free-resources" element={<FreeResources />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/licensing" element={<Licensing />} />
      <Route path="/guitar-together" element={<GuitarTogether />} />
      {/* Retired: the Summer 2026 landing page. Redirect rather than render nothing. */}
      <Route path="/summer-2026" element={<Navigate to="/" replace />} />
      <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;