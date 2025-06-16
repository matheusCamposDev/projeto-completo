import axios from "axios";

export async function getMatriculas() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API__MATRICULAS_URL}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

export async function matricularAluno(alunoId: number, cursoId: number) {
  return axios.post(`${import.meta.env.VITE_API__MATRICULAS_URL}`, {
    alunoId,
    cursoId,
  });
}

export async function deleteMatricula(id:number) {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API__MATRICULAS_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}