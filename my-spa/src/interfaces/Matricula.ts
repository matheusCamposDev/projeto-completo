import type { Aluno } from "./Aluno";
import type { Curso } from "./Curso";

export interface Matricula {
  id: number;
  aluno: Aluno;
  curso: Curso;
}