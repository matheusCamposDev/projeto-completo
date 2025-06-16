import { useEffect, useState } from "react";
import { getCursos } from "../services/cursoService";
import type { JSX } from "react";
import AlertModal from "./AlertModal";
import { useNavigate } from "react-router-dom";
import type { Curso } from "../interfaces/Curso";
import { matricularAluno } from "../services/matriculaService";



interface SelecionarCursoProps {
  aluno: any;
}

export default function CursoSelector({
  aluno,
}: SelecionarCursoProps): JSX.Element {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalTitulo, setModalTitulo] = useState("");
  const [modalMensagem, setModalMensagem] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    getCursos().then(setCursos);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const curso = cursos.find((c) => c.id === Number(e.target.value)) || null;
    setCursoSelecionado(curso);
  };

  const handleConfirmar = async () => {
    try {
      if (cursoSelecionado && aluno) {
        await matricularAluno(aluno.id, cursoSelecionado.id);
      }
      setModalTitulo("Parabéns!!");
      setModalMensagem("Matrícula realizada com sucesso.");
      setModalAberto(true);
    } catch (error) {
      setModalTitulo("Atenção!!");
      setModalMensagem("Algum problema ocorreu, contate o suporte.");
      setModalAberto(true);
      throw error;
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-[#D9D8C4] text-black p-6">
      <select
        className="w-full max-w-sm p-2 border rounded"
        onChange={handleChange}
        defaultValue=""
      >
        <option value="" disabled>
          Selecione um curso
        </option>
        {cursos.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {cursoSelecionado && (
        <p className="text-gray-700 max-w-sm text-center">
          Descrição: {cursoSelecionado.description}
        </p>
      )}

      <button
        onClick={handleConfirmar}
        disabled={!cursoSelecionado}
        className="bg-black text-white px-4 py-2 rounded hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Confirmar matrícula
      </button>
      {modalAberto && (
        <AlertModal
          title={modalTitulo}
          message={modalMensagem}
          onClose={() => {
            setModalAberto(false);
            navigate("/");
          }}
        />
      )}
    </div>
  );
}
