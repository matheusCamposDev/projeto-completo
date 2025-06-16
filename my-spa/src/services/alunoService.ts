import axios from "axios";

export async function getAluno(
  Name: string,
  Email: string,
  DataNascimento: string
) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API__ALUNO_URL}`, {
      params: {
        Name,
        Email,
        DataNascimento,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

export async function postAluno(
  Name: string,
  Email: string,
  DataNascimento: string
) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API__ALUNO_URL}`, {
      name: Name,
      email: Email,
      dataNascimento: DataNascimento,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

export async function updateAluno(
  id: number,
  name: string,
  email: string,
  dataNascimento: string
) {
  try {
    return axios.put(`${import.meta.env.VITE_API__ALUNO_URL}/${id}`, {
      name: name,
      email: email,
      dataNascimento: dataNascimento,
    });
  } catch (error) {}
}

export async function getAlunos() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API__ALUNOS_URL}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteAluno(id: number) {
  try {
    return axios.delete(`${import.meta.env.VITE_API__ALUNO_URL}/${id}`);
  } catch (error: any) {
    throw error;
  }
}
