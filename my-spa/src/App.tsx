import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Matricula from './pages/Matricula';
import Cursos from './pages/Cursos.tsx';
import Alunos from './pages/Alunos.tsx';
import AlunosMatriculados from './pages/AlunosMatriculados.tsx';


export function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matricula" element={<Matricula />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/matriculados" element={<AlunosMatriculados />} />
      </Routes>
  );
}

export default App
