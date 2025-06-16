import { useEffect, useState } from "react";
import { getAlunos } from "../services/alunoService";
import AlunoUpdateModal from "./AlunoUpdateModal";
import DeleteAlunoModal from "./DeleteAlunoModal";

type Aluno = {
  id: number;
  name: string;
  email: string;
  dataNascimento: string;
};

export default function AlunosTable() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const alunosPorPagina = 5;
  const indexUltimoCurso = paginaAtual * alunosPorPagina;
  const indexPrimeiroCurso = indexUltimoCurso - alunosPorPagina;
  const cursosPaginados = alunos.slice(indexPrimeiroCurso, indexUltimoCurso);
  const totalPaginas = Math.ceil(alunos.length / alunosPorPagina);

  const fetchAlunos = async () => {
    try {
      setLoading(true);
      setError("");
      var response = await getAlunos();
      setAlunos(response);
    } catch (err) {
      setError("Erro ao carregar alunos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#D9D4A0] rounded shadow">
      <h2 className="text-xl font-bold mb-4">Lista de Alunos</h2>

      {loading && <p>Carregando alunos...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <table className="w-full border border-gray-300 text-left">
          <thead>
            <tr>
              <th className="border p-2">Aluno</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Data de Nascimento</th>
              <th className="border p-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  Nenhum aluno encontrado.
                </td>
              </tr>
            )}
            {cursosPaginados.map((aluno, index) => (
              <tr key={index}>
                <td className="border p-2">{aluno.name}</td>
                <td className="border p-2">{aluno.email}</td>
                <td className="border p-2">
                  {new Date(aluno.dataNascimento).toLocaleDateString()}
                </td>
                <td className="border p-2 text-center space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => {
                      setAlunoSelecionado(aluno);
                      setModalAberto(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => {
                      setAlunoSelecionado(aluno);
                      setModalExcluirAberto(true);
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
            disabled={paginaAtual === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="text-gray-700 font-medium">
            Página {paginaAtual} de {totalPaginas}
          </span>

          <button
            onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))}
            disabled={paginaAtual === totalPaginas}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      {modalExcluirAberto && alunoSelecionado && (
        <DeleteAlunoModal
          aluno={alunoSelecionado!}
          onClose={() => setModalExcluirAberto(false)}
          onSuccess={fetchAlunos}
        />
      )}

      {modalAberto && alunoSelecionado &&(
        <AlunoUpdateModal
          aluno={alunoSelecionado!}
          onClose={() => setModalAberto(false)}
          onSuccess={fetchAlunos}
        />
      )}
    </div>
  );
}
