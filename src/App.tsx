
import LeadMagnetPage from './pages/LeadMagnetPage';

function App() {
  return (
    <Routes>
      <Route path="/summer-2026" element={<Summer2026 />} />
      <Route path="/confidentmusician" element={<CMIndex />} />
      <Route path="/confidentmusician/lessons" element={<CMLessons />} />
      <Route path="/confidentmusician/pdfs" element={<CMPDFs />} />
      <Route path="/confidentmusician/videos" element={<CMVideos />} />
      <Route path="/confidentmusician/audio" element={<CMAudio />} />
      <Route path="/free-download" element={<LeadMagnetPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
