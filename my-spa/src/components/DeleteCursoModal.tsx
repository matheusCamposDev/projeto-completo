type Props = {
  cursoNome: string;
  cursoId: number;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteCursoModal({ cursoNome, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Confirmar Exclusão</h2>
        <p className="mb-6 text-center">Tem certeza que deseja excluir o curso <strong>{cursoNome}</strong>?</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            Não
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onConfirm}
          >
            Sim, Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
