import { useEffect, useState } from "react";
import { postCurso, putCurso } from "../services/cursoService";
import type { Curso } from "../interfaces/Curso";

interface CursoModalProps {
  title: string;
  modo: "criar" | "editar";
  curso?: Curso | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CursoModal({
  title,
  modo,
  curso,
  onClose,
  onSuccess,
}: CursoModalProps) {
  const [nameCurso, setNome] = useState("");
  const [descriptionCurso, setDescricao] = useState("");

  useEffect(() => {
      if (curso) {
        setNome(curso.name);
        setDescricao(curso.description);
      }
    }, [curso]);

  const handleSalvar = async () => {
    try {
      if (modo === "criar") {
        await postCurso(nameCurso, descriptionCurso);
      } else if (modo === "editar") {
        await putCurso(curso!.id, nameCurso, descriptionCurso);
      }
      setNome("");
      setDescricao("");
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar curso:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <input
          type="text"
          placeholder="Nome do curso"
          value={nameCurso}
          onChange={(e) => setNome(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <textarea
          placeholder="Descrição"
          value={descriptionCurso}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
