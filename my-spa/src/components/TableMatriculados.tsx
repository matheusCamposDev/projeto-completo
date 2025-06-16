import { useEffect, useState } from "react";
import { getMatriculas } from "../services/matriculaService";
import DeleteMatriculaModal from "./DeleteMatriculaModal";
import type { Matricula } from "../interfaces/Matricula";

export default function TableMatriculados() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [filtro, setFiltro] = useState(""); // ⬅️ estado do filtro
  const [loading, setLoading] = useState(false);
  const [modalDeleteAberto, setModalDeleteAberto] = useState(false);
  const [cursoSelecionado, setMatriculaSelecionada] =
    useState<Matricula | null>(null);

  const matriculasPorPagina = 5;

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getMatriculas();
      setMatriculas(data);
    } catch (error) {
      console.error("Erro ao buscar matrículas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔍 Filtrar por nome do aluno
  const matriculasFiltradas = matriculas.filter((matricula) =>
    matricula.aluno.name.toLowerCase().includes(filtro.toLowerCase())
  );

  // 🧮 Paginação sobre os dados filtrados
  const totalPaginas = Math.ceil(matriculasFiltradas.length / matriculasPorPagina);
  const indexUltimoMatricula = paginaAtual * matriculasPorPagina;
  const indexPrimeiroMatricula = indexUltimoMatricula - matriculasPorPagina;
  const matriculasPaginadas = matriculasFiltradas.slice(
    indexPrimeiroMatricula,
    indexUltimoMatricula
  );

  // Resetar página quando filtro mudar
  useEffect(() => {
    setPaginaAtual(1);
  }, [filtro]);

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-[#D9D4A0] shadow-md rounded p-4">
        <h1 className="text-2xl font-bold mb-4">Alunos Matriculados</h1>

        <input
          type="text"
          placeholder="Filtrar por nome do aluno"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <div className="overflow-x-auto">
          {!loading && (
            <table className="w-full border border-gray-300 text-left">
              <thead>
                <tr className="text-left text-sm font-semibold text-gray-700">
                  <th className="border p-2">Aluno</th>
                  <th className="border p-2">Curso</th>
                  <th className="border p-2 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {matriculasPaginadas.map((matricula, index) => (
                  <tr key={index}>
                    <td className="border p-2">{matricula.aluno.name}</td>
                    <td className="border p-2">{matricula.curso.name}</td>
                    <td className="border p-2 text-center space-x-2">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        onClick={() => {
                          setMatriculaSelecionada(matricula);
                          setModalDeleteAberto(true);
                        }}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
                {matriculasFiltradas.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-4 text-center text-gray-500"
                    >
                      Nenhuma matrícula encontrada.
                    </td>
                  </tr>
                )}
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
              Página {paginaAtual} de {totalPaginas || 1}
            </span>

            <button
              onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))}
              disabled={paginaAtual === totalPaginas || totalPaginas === 0}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Próxima
            </button>
          </div>

          {/* 🗑 Modal de exclusão */}
          {modalDeleteAberto && cursoSelecionado && (
            <DeleteMatriculaModal
              matricula={cursoSelecionado}
              onCancel={() => {
                setModalDeleteAberto(false);
              }}
              onSuccess={() => {
                fetchData();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
