import axios from "axios";

export async function getCursos() {
  const response = await axios.get(`${import.meta.env.VITE_API__CURSOS_URL}`);
  return response.data;
}

export async function postCurso(name: string, description: string) {
  try {
    return axios.post(`${import.meta.env.VITE_API__CURSO_URL}`, {
      name,
      description,
    });
  } catch (error) {}
}

export async function putCurso(id: number, name: string, description: string) {
  try {
    return axios.put(`${import.meta.env.VITE_API__CURSO_URL}/${id}`, {
      name,
      description,
    });
  } catch (error) {}
}

export async function deleteCurso(id: number) {
  try {
    return axios.delete(`${import.meta.env.VITE_API__CURSO_URL}/${id}`)
  } catch (error) {}
}

