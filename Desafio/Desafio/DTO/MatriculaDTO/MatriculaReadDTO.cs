using Desafio.DTO.AlunoDTO;
using Desafio.DTO.CursoDTO;
using Desafio.Models;

namespace Desafio.DTO.MatriculaDTO
{
    public class MatriculaReadDTO
    {
        public int Id { get; set; }
        public AlunoReadDTO Aluno { get; set; }
        public CursoReadDTO Curso { get; set; }
    }
}
