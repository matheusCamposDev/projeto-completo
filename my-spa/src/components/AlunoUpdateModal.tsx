import { useEffect, useState } from "react";
import { updateAluno } from "../services/alunoService";
import type { Aluno } from "../interfaces/Aluno";

interface AlunoModalProps {
  aluno: Aluno;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AlunoUpdateModal({ aluno, onClose, onSuccess }: AlunoModalProps) {
  const [nameAluno, setName] = useState("");
  const [emailAluno, setEmail] = useState("");
  const [dataNascimentolAluno, setDataNascimento] = useState("");

  useEffect(() => {
    if (aluno) {
      setName(aluno.name);
      setEmail(aluno.email);
      setDataNascimento(aluno.dataNascimento.split("T")[0]);
    }
  }, [aluno]);

  const handleSalvar = async () => {
    try {
      await updateAluno(aluno.id, nameAluno, emailAluno, dataNascimentolAluno);
      setName("");
      setEmail("");
      setDataNascimento("");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Atualizar Aluno</h2>

        <input
          type="text"
          placeholder="Nome do aluno"
          value={nameAluno}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Data Nascimento"
          value={emailAluno}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <input
          type="date"
          placeholder="Data Nascimento"
          value={dataNascimentolAluno}
          onChange={(e) => setDataNascimento(e.target.value)}
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
