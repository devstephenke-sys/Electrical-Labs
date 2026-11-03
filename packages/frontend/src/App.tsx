import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WorkshopPage from './pages/WorkshopPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workshop" element={<WorkshopPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
