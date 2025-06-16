using AutoMapper;
using Desafio.DTO.CursoDTO;
using Desafio.Models;

namespace Desafio.Mapping
{
    public class CursoProfile : Profile
    {
        public CursoProfile()
        {
            CreateMap<CursoCreateDTO, Curso>();
            CreateMap<Curso, CursoReadDTO>();
            CreateMap<CursoUpdateDTO, Curso>();
        }
    }
}
