import CursoSelector from "../components/CursoSelector";
import MatriculaForm from "../components/MatriculaForm";
import { useState } from "react";

export default function Matricula() {
  const [etapa, setEtapa] = useState<"formulario" | "curso">("formulario");
  const [aluno, setAluno] = useState<any>(null);

  const handleSucesso = (alunoData: any) => {
    setAluno(alunoData);
    setEtapa("curso");
  };

  return (
    <>
      {etapa === "formulario" && <MatriculaForm onSucesso={handleSucesso} />}
      {etapa === "curso" && aluno && <CursoSelector aluno={aluno} />}
    </>
  );
}
