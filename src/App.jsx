import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Professor from './pages/Professor';
import Students from './pages/Students';
import Research from './pages/Research';
import Publications from './pages/Publications';
import Teaching from './pages/Teaching';
import Projects from './pages/Projects';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="professor" element={<Professor />} />
          <Route path="students" element={<Students />} />
          <Route path="research" element={<Research />} />
          <Route path="publications" element={<Publications />} />
          <Route path="teaching" element={<Teaching />} />
          <Route path="projects" element={<Projects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}