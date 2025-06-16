import { useState } from "react";
import type { Aluno } from "../interfaces/Aluno";
import { deleteAluno } from "../services/alunoService";
import AlertModal from "./AlertModal";

interface DeleteAlunoModalProps {
  aluno: Aluno;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteAlunoModal({
  aluno,
  onClose,
  onSuccess,
}: DeleteAlunoModalProps) {
  const [showAlert, setShowAlert] = useState(false);
  const handleConfirm = async () => {
    try {
      await deleteAluno(aluno.id);
      onSuccess();
      onClose();
    } catch (error) {}
    setShowAlert(true);
  };

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Confirmar exclusão</h2>
        <p>
          Tem certeza que deseja excluir <strong>{aluno.id}</strong>?
        </p>
        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sim, excluir
          </button>
          {showAlert && (
            <AlertModal
              title="Atenção!!"
              message="O aluno pode estar matriculado em mais de um curso. Para realizar esta operação por favor encerre todas a matrículas do aluno."
              onClose={() => onClose()}
            />
          )}
        </div>
      </div>
    </div>
  );
}
