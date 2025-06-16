import { Card } from "../components/Card";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D9D8C4]">
      <div className="flex gap-8">
        <Card title="Matricular Aluno" to="/matricula" />
        <Card title="Cursos" to="/cursos" />
        <Card title="Todos os Alunos" to="/alunos" />
        <Card title="Alunos Marticulados" to="/matriculados" />
      </div>
    </div>
  );
}