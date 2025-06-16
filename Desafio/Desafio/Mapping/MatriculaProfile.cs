
using AutoMapper;
using Desafio.DTO.AlunoDTO;
using Desafio.DTO.CursoDTO;
using Desafio.DTO.MatriculaDTO;
using Desafio.Models;

namespace Desafio.Mapping
{
    public class MatriculaProfile : Profile
    {
        public MatriculaProfile()
        {
            CreateMap<MatriculaCreateDTO, Matricula>();
            CreateMap<Matricula, MatriculaReadDTO>();
            CreateMap<Aluno, AlunoReadDTO>();
            CreateMap<Curso, CursoReadDTO>();
        }
    }
}
