
interface AlertModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

export default function AlertModal({ title, message, onClose }: AlertModalProps) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="bg-white border border-black p-6 rounded-xl shadow-xl w-[300px] text-center">
        <h2 className="text-lg font-bold mb-2 text-black">{title}</h2>
        <p className="text-gray-700 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-black text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Ok
        </button>
      </div>
    </div>
  );
}
