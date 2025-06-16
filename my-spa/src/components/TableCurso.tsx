import { useEffect, useState } from "react";
import { deleteCurso, getCursos } from "../services/cursoService";
import type { Curso } from "../interfaces/Curso";
import CursoModal from "./CursoModal";
import DeleteCursoModal from "./DeleteCursoModal";

export default function CursoTabela() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const cursosPorPagina = 5;
  const indexUltimoCurso = paginaAtual * cursosPorPagina;
  const indexPrimeiroCurso = indexUltimoCurso - cursosPorPagina;
  const cursosPaginados = cursos.slice(indexPrimeiroCurso, indexUltimoCurso);
  const totalPaginas = Math.ceil(cursos.length / cursosPorPagina);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoModal, setModoModal] = useState<"criar" | "editar">("criar");
  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);
  const [modalDeleteAberto, setModalDeleteAberto] = useState(false);
  const [cursoParaExcluir, setCursoParaExcluir] = useState<Curso | null>(null);

  const fetchCursos = async () => {
    const dados = await getCursos();
    setCursos(dados);
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  return (
    <div className="p-6 flex justify-center ">
      <div className="w-full max-w-3xl bg-[#D9D4A0] shadow-md rounded p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Lista de Cursos</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 my-2 rounded hover:bg-green-700 transition"
          onClick={() => {
            setModoModal("criar");
            setModalAberto(true);
          }}
        >
          Adicionar
        </button>

        <table className="w-full border border-gray-300 text-left">
          <thead>
            <tr>
              <th className="border p-2">Curso</th>
              <th className="border p-2">Descrição</th>
              <th className="border p-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {cursosPaginados.map((curso, index) => (
              <tr key={index}>
                <td className="border p-2">{curso.name}</td>
                <td className="border p-2">{curso.description}</td>
                <td className="border p-2 text-center space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => {
                      setModoModal("editar");
                      setModalAberto(true);
                      setCursoSelecionado(curso);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => {
                      setCursoParaExcluir(curso);
                      setModalDeleteAberto(true);
                    }}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalDeleteAberto && cursoParaExcluir && (
          <DeleteCursoModal
            cursoNome={cursoParaExcluir.name}
            cursoId={cursoParaExcluir.id}
            onCancel={() => {
              setCursoParaExcluir(null);
              setModalDeleteAberto(false);
            }}
            onConfirm={async () => {
              try {
                await deleteCurso(cursoParaExcluir.id);
                await fetchCursos();
                setCursoParaExcluir(null);
                setModalDeleteAberto(false);
              } catch (error) {
                alert("Erro ao excluir o curso.");
              }
            }}
          />
        )}

        {modalAberto && (
          <CursoModal
            title={modoModal === "criar" ? "Novo Curso" : "Atualizar Curso"}
            modo={modoModal}
            curso={cursoSelecionado}
            onClose={() => setModalAberto(false)}
            onSuccess={fetchCursos}
          />
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
      </div>
    </div>
  );
}
