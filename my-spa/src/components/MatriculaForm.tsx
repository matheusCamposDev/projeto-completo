import { useState } from "react";
import { getAluno, postAluno } from "../services/alunoService";
import AlertModal from "./AlertModal";
import type { JSX } from "react";

interface MatriculaFormProps {
  onSucesso: (aluno: any) => void;
}

export default function MatriculaForm({
  onSucesso,
}: MatriculaFormProps): JSX.Element {
  const [Name, setNome] = useState("");
  const [Email, setEmail] = useState("");
  const [DataNascimento, setDataNascimento] = useState("");
  const [erroEmail] = useState("");
  const [nomeTocado, setNameTouched] = useState(false);
  const [emailTocado, setEmailTouched] = useState(false);
  const [erroDataNascimento, setErroDataNascimento] = useState("");

  const [modalAberto, setModalAberto] = useState(false);
  const [modalTitulo, setModalTitulo] = useState("");
  const [modalMensagem, setModalMensagem] = useState("");

  const [alunoExiste, setAlunoExiste] = useState(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValido = emailRegex.test(Email);
  const emailErro = emailTocado && !emailValido;

  const nomeValido = Name.trim().length >= 2 && Name.trim().length <= 100;
  const nameErro = nomeTocado && !nomeValido;

  const dataValida = (() => {
    if (!DataNascimento) return false;

    const hoje = new Date();
    const nascimento = new Date(DataNascimento);
    const idadeEmAnos = hoje.getFullYear() - nascimento.getFullYear();

    const idadeValida = idadeEmAnos >= 18;
    const naoFuturo = nascimento <= hoje;

    return idadeValida && naoFuturo;
  })();

  const formularioValido = nomeValido && emailValido && dataValida;

  const handleSubmit = async () => {
    try {
      var alunoExiste = await getAluno(Name, Email, DataNascimento);
      setModalTitulo("Atenção!!");
      setModalMensagem("Aluno já existe em nosso sistema.");
      setModalAberto(true);
      setAlunoExiste(alunoExiste);
      return;
    } catch {
      try {
        var alunoNovo = await postAluno(Name, Email, DataNascimento);
        setModalTitulo("Sucesso!!");
        setModalMensagem("Aluno cadastrado com sucesso");
        setModalAberto(true);
        setAlunoExiste(alunoNovo);
        return;
      } catch {
        return;
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#D9D8C4] text-black p-4">
      <div className="bg-[#D9D4A0] p-6 rounded-lg shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-center">Matrícula do Aluno</h2>

        <div>
          <label className="block text-sm font-medium">Nome:</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded"
            value={Name}
            onChange={(e) => setNome(e.target.value)}
            onBlur={() => setNameTouched(true)}
            onFocus={() => setNameTouched(true)}
          />
          {nameErro && (
            <p className="text-red-600 text-sm mt-1">
              O nome deve ter entre 2 e 100 caracteres.
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Email:</label>
          <input
            type="email"
            className="w-full mt-1 p-2 border rounded"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            onFocus={() => setEmailTouched(true)}
          />
          {erroEmail && (
            <p className="text-red-600 text-sm mt-1">{erroEmail}</p>
          )}
          {emailErro && (
            <p className="text-red-600 text-sm mt-1">Digite um email válido.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">
            Data de Nascimento:
          </label>
          <input
            type="date"
            className="w-full mt-1 p-2 border rounded"
            value={DataNascimento}
            onChange={(e) => {
              setDataNascimento(e.target.value);

              const hoje = new Date();
              const nascimento = new Date(e.target.value);
              const idade = hoje.getFullYear() - nascimento.getFullYear();

              if (!e.target.value) {
                setErroDataNascimento("A data é obrigatória.");
              } else if (nascimento > hoje) {
                setErroDataNascimento("A data não pode ser no futuro.");
              } else if (idade < 18) {
                setErroDataNascimento("Idade mínima é de 18 anos.");
              } else {
                setErroDataNascimento("");
              }
            }}
          />
          {erroDataNascimento && (
            <p className="text-red-600 text-sm mt-1">{erroDataNascimento}</p>
          )}
        </div>

        <button
          className={`w-full py-2 rounded transition cursor-pointer 
            ${
              formularioValido
                ? "bg-black text-white hover:bg-red-600"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          onClick={handleSubmit}
          disabled={!formularioValido}
        >
          Enviar
        </button>
        {modalAberto && (
          <AlertModal
            title={modalTitulo}
            message={modalMensagem}
            onClose={() => {
              setModalAberto(false);
              onSucesso(alunoExiste);
            }}
          />
        )}
      </div>
    </div>
  );
}
