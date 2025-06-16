using AutoMapper;
using Desafio.DTO.AlunoDTO;
using Desafio.Models;

namespace Desafio.Mapping
{
    public class AlunoProfile : Profile
    {
        public AlunoProfile()
        {
            CreateMap<Aluno, AlunoCreateDTO>();
            CreateMap<AlunoCreateDTO, Aluno>();
            CreateMap<AlunoUpdateDTO, Aluno>();
            CreateMap<Aluno, AlunoReadDTO>();
        }
    }
}
